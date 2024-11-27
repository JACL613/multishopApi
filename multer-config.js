const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Definir dónde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination >>");

    // Aquí especificas la carpeta donde se guardarán las imágenes
    // Verificar si el directorio existe, si no, crearlo
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, "uploads/"); // Asegúrate de tener creada la carpeta 'uploads' en la raíz
  },
  filename: (req, file, cb) => {
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

//   fileFilter: (_, file, cb) => {
//     console.log("file >>>>>>", file);
//     return cb(null, true);
//     try {
//       // Define los tipos de archivos permitidos
//       const fileTypes = /jpeg|jpg|png|gif/;
//       const mimeType = fileTypes.test(file.mimetype); // Verifica el tipo MIME
//       const extname = fileTypes.test(
//         path.extname(file.originalname).toLowerCase()
//       ); // Verifica la extensión
//       console.log(mimeType, extname);

//       // Validación de tipo de archivo
//       if (mimeType && extname) {
//         console.log("Validación de tipo de archivo");

//         return cb(null, true); // Archivo válido
//       } else {
//         // Archivo no válido
//         return cb(
//           new Error("El archivo no es una imagen válida (jpeg, jpg, png, gif).")
//         );
//       }
//     } catch (err) {
//       // Captura errores inesperados
//       console.error("Error en el fileFilter:", err.message);
//       cb(new Error("Ocurrió un error al procesar el archivo."));
//     }
//   },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño máximo a 5MB
});

module.exports = upload.single('file') 
