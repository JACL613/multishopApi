const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRETKEY
// Middleware para verificar el token y el rol del usuario
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    // Guardar la información del usuario en la solicitud
    req.user = decoded;
    // Verificar si el usuario es administrador
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No tienes autorización para realizar esta acción" });
    }
    next();
  });
};

module.exports = authMiddleware