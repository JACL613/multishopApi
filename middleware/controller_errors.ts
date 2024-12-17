// middleware/errorHandler.js
export const errorHandler = (err: { message: any; stack: any; status: any; }, req: any, res: { headersSent: any; status: (arg0: any) => { (): any; new(): any; json: { (arg0: { success: boolean; error: any; }): any; new(): any; }; }; }, next: () => void) => {
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
  
  