export const createTableQueries = [
  {
    queryText: `
            CREATE TABLE IF NOT EXISTS usuarios (
                id UUID PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                apellido_paterno VARCHAR(255) NOT NULL,
                apellido_materno VARCHAR(255),
                email VARCHAR(100) NOT NULL UNIQUE,
                telefono VARCHAR(12) NOT NULL,
                active BOOLEAN DEFAULT TRUE
            );
        `,
    name: "usuarios",
  },
  {
    queryText: `
            CREATE TABLE IF NOT EXISTS direccion (
                id UUID PRIMARY KEY,
                user_id UUID REFERENCES usuarios(id),
                calle VARCHAR(255) NOT NULL,
                numero VARCHAR(5) NOT NULL,
                comuna VARCHAR(100) NOT NULL,
                region VARCHAR(100) NOT NULL,
                ciudad VARCHAR(100) NOT NULL,
                zip_code VARCHAR(10) NOT NULL
            );
        `,
    name: "direccion",
  },
  {
    queryText: `
            CREATE TABLE IF NOT EXISTS productos (
                id UUID PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                price INTEGER NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0,
                active BOOLEAN DEFAULT TRUE
            );
        `,
    name: "productos",
  },
  {
    queryText: `
            CREATE TABLE IF NOT EXISTS ventas (
                id UUID PRIMARY KEY,
                user_id UUID REFERENCES usuarios(id),
                total INTEGER NOT NULL,
                date TIMESTAMP DEFAULT NOW()
            );
        `,
    name: "ventas",
  },
  {
    queryText: `
            CREATE TABLE IF NOT EXISTS ventas_productos (
                id UUID PRIMARY KEY,
                venta_id UUID REFERENCES ventas(id),
                producto_id UUID REFERENCES productos(id),
                cantidad INTEGER NOT NULL,
                subtotal INTEGER NOT NULL
            );
        `,
    name: "ventas_productos",
  },
];