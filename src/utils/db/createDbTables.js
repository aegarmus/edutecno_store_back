import { query } from "../../config/db.config.js";
import { getTableDetails, tableExists } from "./confirmDetailsTables.js";

export const createUserTable = async() => {
    try {
        const queryCreate = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id UUID PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                apellido_paterno VARCHAR(255) NOT NULL,
                apellido_materno VARCHAR(255),
                email VARCHAR(100) NOT NULL UNIQUE,
                telefono VARCHAR(12) NOT NULL,
                active BOOLEAN DEFAULT TRUE
            );
        `;

        const exists = await tableExists('usuarios');
        await query(queryCreate)
        const tableDetails = await getTableDetails('usuarios');

        exists
          ? console.log(`Tabla "usuarios" ya existe en la base de datos. Detalles: `)
          : console.log('Tabla "usuarios" verificada y creada con éxito. Detalles: ');

        
        console.table(tableDetails)

    } catch (error) {
        console.error(`Error al crear la tabla usuarios. ERROR: ${error}`)
    }
};

export const createAddressTable = async () => {
  try {
    const queryCreate = `
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
        `;

    const exists = await tableExists("direccion");
    await query(queryCreate);
    const tableDetails = await getTableDetails("direccion");

    exists
      ? console.log(
          `Tabla "direccion" ya existe en la base de datos. Detalles: `
        )
      : console.log(
          'Tabla "direccion" verificada y creada con éxito. Detalles: '
        );

    console.table(tableDetails);
  } catch (error) {
    console.error(`Error al crear la tabla direccion. ERROR: ${error}`);
  }
};


export const createProductTable = async () => {
  try {
    const queryCreate = `
            CREATE TABLE IF NOT EXISTS productos (
                id UUID PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                price INTEGER NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0,
                active BOOLEAN DEFAULT TRUE
            );
        `;

    const exists = await tableExists("productos");
    await query(queryCreate);
    const tableDetails = await getTableDetails("productos");

    exists
      ? console.log(
          `Tabla "productos" ya existe en la base de datos. Detalles: `
        )
      : console.log(
          'Tabla "productos" verificada y creada con éxito. Detalles: '
        );

    console.table(tableDetails);
  } catch (error) {
    console.error(`Error al crear la tabla productos. ERROR: ${error}`);
  }
};


export const createSalesTable = async () => {
  try {
    const queryCreate = `
            CREATE TABLE IF NOT EXISTS ventas (
                id UUID PRIMARY KEY,
                user_id UUID REFERENCES usuarios(id),
                total INTEGER NOT NULL,
                date TIMESTAMP DEFAULT NOW()
            );
        `;

    const exists = await tableExists("ventas");
    await query(queryCreate);
    const tableDetails = await getTableDetails("ventas");

    exists
      ? console.log(
          `Tabla "ventas" ya existe en la base de datos. Detalles: `
        )
      : console.log(
          'Tabla "ventas" verificada y creada con éxito. Detalles: '
        );

    console.table(tableDetails);
  } catch (error) {
    console.error(`Error al crear la tabla ventas. ERROR: ${error}`);
  }
};


export const createSalesProductsTable = async () => {
  try {
    const queryCreate = `
            CREATE TABLE IF NOT EXISTS ventas_productos (
                id UUID PRIMARY KEY,
                venta_id UUID REFERENCES ventas(id),
                producto_id UUID REFERENCES productos(id),
                cantidad INTEGER NOT NULL,
                subtotal INTEGER NOT NULL
            );
        `;

    const exists = await tableExists("ventas_productos");
    await query(queryCreate);
    const tableDetails = await getTableDetails("ventas_productos");

    if(exists) {
      console.log(`Tabla "ventas_productos" ya existe en la base de datos. Detalles: `);  
    } else {
        console.log('Tabla "ventas_productos" verificada y creada con éxito. Detalles: ');
    }

    /* exists
      ? console.log(
          `Tabla "ventas_productos" ya existe en la base de datos. Detalles: `
        )
      : console.log(
          'Tabla "ventas_productos" verificada y creada con éxito. Detalles: '
        ); */

    console.table(tableDetails);
  } catch (error) {
    console.error(`Error al crear la tabla ventas_productos. ERROR: ${error}`);
  }
};