const express = require('express');
const app = express();
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Agregar un nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, precio } = req.body;
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        productos[productoIndex] = { id, nombre, precio };
        res.json(productos[productoIndex]);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1);
        res.status(204).end(); // No hay contenido que devolver
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
