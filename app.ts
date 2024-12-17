require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routesProductos = require("./routes/route_productos");
const routesCategorias = require("./routes/route_categorias");
const routesDespachos = require("./routes/route_despachos");
const routesPedidos = require("./routes/route_pedidos");
const routesUsuario = require("./routes/route_usuario");
const path = require("path");
const errorHandler = require("./middleware/controller_errors");

require("./databases/connectionDb");

const app = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "dist")));
morgan.token("body", (req: { body: any; }) => JSON.stringify(req.body));
morgan.token("headers", (req: { headers: any; }) => JSON.stringify(req.headers));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body :headers"
  )
);
app.use(cors());
// app.use(errorHandler);

// Rutas
app.use("/api/productos", routesProductos);
app.use("/api/despachos", routesDespachos);
app.use("/api/pedidos", routesPedidos);
app.use("/api/categorias", routesCategorias);
app.use("/api/usuario", routesUsuario);

// app.get('/', (req: { res: any; }, res: { sendFile: (arg0: string) => void; }) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
