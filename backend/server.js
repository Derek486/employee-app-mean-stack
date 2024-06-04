const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemController = require('./controllers/item.controller');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.log('Error al conectar a MongoDB:', error);
    });

app.get('/api/items', itemController.getItems);
app.get('/api/items/:id', itemController.getItemById);
app.post('/api/items', itemController.createItem);
app.put('/api/items/:id', itemController.updateItem);
app.delete('/api/items/:id', itemController.deleteItem);

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor backend en funcionamiento en el puerto', port);
});