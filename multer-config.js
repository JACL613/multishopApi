const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Definir dónde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Aquí especificas la carpeta donde se guardarán las imágenes
     // Verificar si el directorio existe, si no, crearlo
     const uploadDir = path.join(__dirname, 'uploads'); 
     if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir); }
    cb(null, './uploads'); // Asegúrate de tener creada la carpeta 'uploads' en la raíz
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo con un nombre único
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Inicializar multer con el almacenamiento configurado
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño máximo a 5MB
  fileFilter: (req, file, cb) => {
    // Asegurarse de que solo se suban imágenes
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

module.exports = upload;
