const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const config = require('./config') // Variables de entorno
const app = express()// Aplicación de express

// Definición de autorización y CORS
app.use(
	cors({
		credentials: false,
		origin: config.FRONTEND_URL,
	})
);

// Formato de logs y recepción de datos
app.use(morgan("dev"));
app.use('/public', express.static('public'))

// Definición de variables de app
app.set('PORT', config.PORT)

// Definición de rutas
const routesEmployee = require('./routes/employees.routes')
app.use('/api/v1/', routesEmployee)

module.exports = app