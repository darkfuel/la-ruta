CREATE DATABASE laruta;

\c laruta;

-- Tabla para Usuarios (Clientes)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
);

-- Tabla para Productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    stock INT NOT NULL,
    descripcion TEXT,
    img VARCHAR(1000) NOT NULL,
    favoritos BOOLEAN default false,
    creado_por INT NOT NULL REFERENCES usuarios(id),
    fecha_creacion timestamp with time zone default now()
    );

CREATE TABLE compras(
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id),
    id_producto INT NOT NULL REFERENCES productos(id),
    cantidad INT NOT NULL,
    fecha_de_compra timestamp with time zone default now()
);