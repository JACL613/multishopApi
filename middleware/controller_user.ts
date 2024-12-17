const {jwt: jwt} = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

// Middleware para verificar el token y el rol del usuario
const authMiddleware = (req: { headers: { [x: string]: any; }; user: { role: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) => {
  const token = req?.headers["authorization"];
  
  if (!token) {
    return res?.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res?.status(401).json({ message: "Failed to authenticate token" });
    }
    // Guardar la información del usuario en la solicitud
    req.user = decoded;
    // Verificar si el usuario es administrador
    if (req.user.role !== "admin") {
      return res?.status(403).json({ message: "No tienes autorización para realizar esta acción" });
    }
    return next();
  });
};

module.exports = {authMiddleware};
