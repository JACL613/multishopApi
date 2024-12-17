const multer = require("multer");
const fs = require("fs");
import path from "path";

// Definir dónde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    console.log("destination >>");

    // Aquí especificas la carpeta donde se guardarán las imágenes
    // Verificar si el directorio existe, si no, crearlo
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, "uploads/"); // Asegúrate de tener creada la carpeta 'uploads' en la raíz
  },
  filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
    console.log("Filename >>>>>>>>");
    try {
      // Renombrar el archivo con un nombre único
      return cb(null, Date.now() + path.extname(file.originalname));
    } catch (error) {
      console.log(error);
    }
    cb(null, file.originalname);
  },
});

// Inicializar multer con el almacenamiento configurado
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño máximo a 5MB
});

module.exports = { upload };
