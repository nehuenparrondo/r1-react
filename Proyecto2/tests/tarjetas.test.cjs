const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const crypto = require('node:crypto')
const ts = require('typescript')

const datos = { nombre: 'Ana', apellido: 'Pérez', profesion: 'Docente' }
const clave = 'r1-tarjeta-personal'

/** Ejecuta los componentes con hooks y almacenamiento aislados de los datos del navegador. */
function entorno(guardado) {
  const values = new Map(guardado === undefined ? [] : [[clave, guardado]])
  const cache = new Map()
  let active
  let bloqueado = false
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem(key, value) {
      if (bloqueado) throw new Error('Almacenamiento bloqueado')
      values.set(key, value)
    },
  }
  const hooks = {
    useState(initial) {
      const instance = active
      const index = instance.cursor++
      if (!(index in instance.values)) {
        instance.values[index] = typeof initial === 'function' ? initial() : initial
      }
      return [instance.values[index], next => {
        instance.values[index] = typeof next === 'function' ? next(instance.values[index]) : next
      }]
    },
    useRef(initial) { return hooks.useState({ current: initial })[0] },
    useEffect() {},
  }
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename)
    const exports = {}
    cache.set(filename, exports)
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    })
    const jsx = (type, props) => ({ type, props })
    vm.runInNewContext(outputText, {
      exports, crypto, localStorage: storage,
      require(name) {
        if (name === 'react') return hooks
        if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
        if (/\.(css|jpg)$/.test(name)) return { default: '/imagen.jpg' }
        const base = path.resolve(path.dirname(filename), name)
        const resolved = [base, base + '.ts', base + '.tsx'].find(file => fs.existsSync(file))
        if (!resolved) throw new Error('Importación inesperada: ' + name)
        return load(resolved)
      },
    }, { filename })
    return exports
  }
  function mount(relative) {
    const component = load(path.resolve(__dirname, relative)).default
    const instance = { values: [], cursor: 0 }
    return () => { active = instance; instance.cursor = 0; return component() }
  }
  return {
    storage: load(path.resolve(__dirname, '../src/services/tarjetaStorage.ts')),
    mount, values, block: () => { bloqueado = true },
  }
}

function nodes(tree) {
  if (Array.isArray(tree)) return tree.flatMap(nodes)
  if (!tree || typeof tree !== 'object') return []
  return [tree, ...nodes(tree.props?.children)]
}
const components = (tree, name) => nodes(tree).filter(node => node.type?.name === name)
const button = (tree, text) => nodes(tree).find(node => node.type === 'button' && node.props.children === text)

test('migra la tarjeta individual anterior y conserva la eliminación anterior', () => {
  const legacy = entorno(JSON.stringify(datos)).storage.cargarTarjetas(datos)
  assert.equal(legacy.length, 1)
  assert.equal(legacy[0].nombre, datos.nombre)
  assert.equal(typeof legacy[0].id, 'string')
  assert.equal(entorno('null').storage.cargarTarjetas(datos).length, 0)
})

test('restaura varias tarjetas y conserva el listado vacío al recargar', () => {
  const saved = [{ ...datos, id: 'uno' }, { ...datos, nombre: 'Luis', id: 'dos' }]
  const restored = entorno(JSON.stringify(saved)).storage.cargarTarjetas(datos)
  assert.equal(restored.length, 2)
  assert.equal(restored[1].nombre, 'Luis')
  assert.equal(entorno('[]').storage.cargarTarjetas(datos).length, 0)
})

test('los datos corruptos o los IDs repetidos recuperan el perfil inicial', () => {
  for (const raw of ['{', '{}', '"texto"', '[null]',
    JSON.stringify([{ ...datos, id: 'uno' }, { ...datos, id: 'uno' }])]) {
    assert.equal(entorno(raw).storage.cargarTarjetas(datos)[0].nombre, 'Ana')
  }
})

test('agrega, edita y elimina una tarjeta por ID conservando las otras', () => {
  const env = entorno()
  const render = env.mount('../src/App.tsx')
  button(render(), '+ Agregar nueva tarjeta').props.onClick()
  components(render(), 'TarjetaForm')[0].props.onGuardar(datos)
  let cards = components(render(), 'Tarjeta')
  assert.equal(cards.length, 2)
  assert.equal(cards[0].props.nombre, 'Fulano')
  assert.equal(cards[1].props.nombre, 'Ana')
  cards[1].props.onEditar()
  components(render(), 'TarjetaForm')[0].props.onGuardar({ ...datos, nombre: 'Ana editada' })
  cards = components(render(), 'Tarjeta')
  assert.equal(cards[0].props.nombre, 'Fulano')
  assert.equal(cards[1].props.nombre, 'Ana editada')
  assert.equal(env.storage.cargarTarjetas(datos)[1].nombre, 'Ana editada')
  cards[1].props.onEliminar()
  assert.equal(components(render(), 'Tarjeta').length, 2)
  components(render(), 'ConfirmarEliminacion')[0].props.onConfirmar()
  assert.equal(components(render(), 'Tarjeta').length, 1)
  assert.equal(env.storage.cargarTarjetas(datos)[0].nombre, 'Fulano')
})

test('cancelar creación, edición o eliminación conserva los datos', () => {
  const env = entorno()
  const render = env.mount('../src/App.tsx')
  button(render(), '+ Agregar nueva tarjeta').props.onClick()
  components(render(), 'TarjetaForm')[0].props.onCancelar()
  components(render(), 'Tarjeta')[0].props.onEditar()
  components(render(), 'TarjetaForm')[0].props.onCancelar()
  components(render(), 'Tarjeta')[0].props.onEliminar()
  components(render(), 'ConfirmarEliminacion')[0].props.onCancelar()
  assert.equal(env.values.size, 0)
  assert.equal(components(render(), 'Tarjeta')[0].props.nombre, 'Fulano')
})

test('un fallo de guardado o eliminación conserva la colección confirmada', () => {
  const env = entorno()
  const render = env.mount('../src/App.tsx')
  env.block()
  button(render(), '+ Agregar nueva tarjeta').props.onClick()
  components(render(), 'TarjetaForm')[0].props.onGuardar(datos)
  assert.equal(components(render(), 'Tarjeta').length, 1)
  assert.equal(components(render(), 'TarjetaForm').length, 1)
  components(render(), 'TarjetaForm')[0].props.onCancelar()
  components(render(), 'Tarjeta')[0].props.onEliminar()
  components(render(), 'ConfirmarEliminacion')[0].props.onConfirmar()
  assert.equal(components(render(), 'Tarjeta').length, 1)
  assert.ok(components(render(), 'ConfirmarEliminacion')[0].props.error)
})

test('el contador vuelve a cero desde valores positivos y negativos', () => {
  const env = entorno()
  const render = env.mount('../../Proyecto3/src/components/counter/Counter.tsx')
  const action = label => nodes(render()).find(node => node.props['aria-label'] === label).props.onClick()
  action('Sumar uno')
  action('Sumar uno')
  assert.equal(nodes(render()).find(node => node.type === 'output').props.children, 2)
  button(render(), 'Restablecer a 0').props.onClick()
  assert.equal(nodes(render()).find(node => node.type === 'output').props.children, 0)
  action('Restar uno')
  button(render(), 'Restablecer a 0').props.onClick()
  assert.equal(nodes(render()).find(node => node.type === 'output').props.children, 0)
})
