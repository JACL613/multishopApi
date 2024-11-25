const Products = require("../databases/models/productos_schema");
const authMiddleware = require("../middleware/controller_user");

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

route.post("/",authMiddleware, async (req, res) => {
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
  if (!title || !description || !image || !price || !amount || !category)
    return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Products.create({
      title,
      description,
      image,
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

route.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const {data} = req.body
  if (!id || !data) return res.status(401).json({ message: "Faltan datos" });
    try {
        const query = await Products.findByIdAndUpdate(id, {...data})
        if(!query) return res.status(404).json({ message: "No se pudo actualizar el producto"})
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
        
    }
});

route.delete("/:id", authMiddleware,async (req, res) => {
const {id} = req.params
  if (!id ) return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Products.findByIdAndDelete(id)
    if(!query) return res.status(404).json({ message: "No se pudo eliminar el producto"})
    return res.status(200).json({ message:"Producto eleiinado", data: query})
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
    
  }

});

module.exports = route;
