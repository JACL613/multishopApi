const Products = require("../databases/models/productos_schema");
const authMiddleware = require("../middleware/controller_user");
const upload = require("../multer-config");
const { MulterError } = require("multer");

const route = require("express").Router();

route.get("/", async (req, res) => {
  try {
    const query = await Products.find({});
    if (!query || query.length <= 0)
      return res.status(404).json({ message: "No hay productos registrados" });
    return res
      .status(200)
      .json({ message: "Producto encontrados", data: query });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Products.findById(id);
    if (!query || query.length <= 0)
      return res.status(404).json({ message: "No se encontro el producto" });
    return res
      .status(200)
      .json({ message: "Producto encontrado", data: query });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

route.post("/", authMiddleware, upload, async (req, res) => {
  const {
    title,
    description,
    image,
    status,
    alt,
    link,
    price,
    amount,
    category,
  } = req.body;
  if (!title || !description || !link || !price || !amount || !category)
    return res.status(401).json({ message: "Faltan datos" });
  // Asegúrate de que la imagen se haya subido correctamente
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Se requiere una imagen para el producto" });
  }

  // Obtener el dominio del entorno actual (localhost para desarrollo o el dominio en producción)
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://dominio.com" // Cambia esto por tu dominio real en producción
      : "http://localhost:3000"; // Para desarrollo, usa localhost o el puerto que tengas

  // Crear la URL completa de la imagen
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
  try {
    const query = await Products.create({
      title,
      description,
      image: imageUrl,
      status,
      alt,
      link,
      price,
      amount,
      category,
    });
    if (!query)
      return res
        .status(404)
        .json({ message: "No se pudo registrar el producto" });
    return res.status(200).json({ message: "Producto creado", data: query });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

route.post(
  "/upload",
  function (req, res, next) {
    upload(req, res, (err) => {
      console.log("upload in callback>>>>>>>", err);
      if (err instanceof MulterError) {
        // A Multer error occurred when uploading.
        return next(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        return next(err);
      }
      next();
    });
  },
  async (req, res) => {
    
    try {
      // Verifica si el archivo fue subido correctamente
      if (!req.file) {
        return res.status(400).json({ error: "No se subió ningún archivo." });
      }

      // upload.single('file'), (req, res) => {
      //   res.status(200).json({ message: 'Archivo subido correctamente', file: req.file });
      // // Respuesta de éxito
      // }
    } catch (err) {
      // Captura cualquier error inesperado
      console.error("Error al procesar la carga:", err.message);
      return res
        .status(500)
        .json({ error: "Ocurrió un error al subir el archivo." });
    }
    // Verificar si el directorio existe, si no, crearlo const
    // uploadDir = path.join(__dirname, 'uploads');
    // if (!fs.existsSync(uploadDir)) {fs.mkdirSync(uploadDir); }

    // Obtener el dominio del entorno actual (localhost para desarrollo o el dominio en producción)
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://dominio.com" // Cambia esto por tu dominio real en producción
        : "http://localhost:3000"; // Para desarrollo, usa localhost o el puerto que tengas

    // Crear la URL completa de la imagen
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    return res.status(200).json({ message: "imagen subida", url: imageUrl });
  }
);
route.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  if (!id || !data) return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Products.findByIdAndUpdate(id, { ...data });
    if (!query)
      return res
        .status(404)
        .json({ message: "No se pudo actualizar el producto" });
    return res
      .status(200)
      .json({ message: "Producto actualizado con exito", data: query });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

route.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Products.findByIdAndDelete(id);
    if (!query)
      return res
        .status(404)
        .json({ message: "No se pudo eliminar el producto" });
    return res.status(200).json({ message: "Producto eleiinado", data: query });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

module.exports = route;
