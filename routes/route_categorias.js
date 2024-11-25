const Categorys = require("../databases/models/categorias_schema");
const authMiddleware = require("../middleware/controller_user");

const route = require("express").Router();

route.get("/", async (req, res) => {
  try {
    const query = await Categorys.find();

    if (!query || query.length < 1)
      return res.json({
        status: 404,
        message: "No se encuentra las categorias",
      });

    return res.json({
      status: 200,
      message: "Categorias encontradas",
      data: query,
    });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.json({ message: "faltan datos", status: 401 });
  try {
    const query = await Categorys.findById(id);
    if (!query)
      return res.json({
        status: 404,
        message: "No se encuentra la categoria",
      });
    return res.json({
      status: 200,
      message: "Categoria encontrada",
      data: query,
    });
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

route.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ message: "faltan datos", status: 401 });

  try {
    const query = await Categorys.create({ name });
    if (!query)
      return res.json({ status: 404, message: "No se pudo registrar" });
    return res.status(200).json({ message:"Categoria registrado", data:query})
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

route.put("/:id", authMiddleware, async (req, res) => {
    const {id} = req.params
    const {data} = req.body
  if (!id || !data) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Categorys.findByIdAndUpdate(id, {...data})
        if(!query) return res.json({status: 404, message: "No se pudo actualizar"})
        return res.json({status: 200 , message: "Categoria actualizada",data: query})
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
        
    } 
});

route.delete("/:id", authMiddleware, async (req, res) => {
    const {id} = req.params
  
    if (!id) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Categorys.findByIdAndDelete(id)
        if(!query) return res.json({ message: "No se pudo borrar", status: 404 });
    return res.json({ message:"Categoria borrada", status: 200 , data: query});
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
        
    }
});

module.exports = route;
