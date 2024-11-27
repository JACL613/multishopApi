// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Loguea el error en la consola con más detalles
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
  
    // Respuesta opcional al cliente
    if (!res.headersSent) {
      return res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
      });
    }
  
    // Llama a next() para que el servidor continúe procesando las siguientes rutas
    next();
  };
  
  module.exports = errorHandler;
  