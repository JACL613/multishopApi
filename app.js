require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routesProductos = require('./routes/route_productos.js')
const routesCategorias = require('./routes/route_categorias.js')
const routesDespachos = require('./routes/route_despachos.js')
const routesPedidos = require('./routes/route_pedidos.js')
const routesUsuario = require('./routes/route_usuario.js')
const path = require('path');
const errorHandler = require('./middleware/controller_errors.js')

require('./databases/connectionDb.js')

const app = express(); 
const PORT = 3000;



// Middleware para analizar el cuerpo de las solicitudes 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));
morgan.token('body', (req) => JSON.stringify(req.body)); 
morgan.token('headers', (req) => JSON.stringify(req.headers)); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :headers'));
app.use(cors()) 
app.use(errorHandler)

// Rutas
app.use('/api/productos' , routesProductos )
app.use('/api/despachos', routesDespachos)
app.use('/api/pedidos', routesPedidos)
app.use('/api/categorias', routesCategorias)
app.use('/api/usuario' , routesUsuario )

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
app.get('/CrearPeli', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

let visitCount = 0;

app.get('/', (req, res) => {
    visitCount++;
    res.sendFile(path.join(__dirname, 'views', 'index.html'), {
        headers: {
            'X-Visit-Count': visitCount // Enviar el contador como header
        }
    });
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
