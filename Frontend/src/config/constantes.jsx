export const URLBASE = import.meta.env.VITE_URL_BACKEND_HOST ?? 'http://localhost:3000'

export const ENDPOINT = {
  detalle: `${URLBASE}/productos`,
  login: `${URLBASE}/login`,
  users: `${URLBASE}/users`,
  productos: `${URLBASE}/productos`,
  nuevoProducto: `${URLBASE}/nuevo-producto`,
  editarUsuario: `${URLBASE}/editarUsuario`,
  productosEdit: `${URLBASE}/productosEdit`
}
