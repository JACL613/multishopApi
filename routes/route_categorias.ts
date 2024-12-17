const {Categorys} = require("../databases/models/categorias_schema");
const {authMiddleware: authMiddlewareCategorias } = require("../middleware/controller_user");

const routeCategorias = require("express").Router();

routeCategorias.get("/", async (req: any, res: { json: (arg0: { status: number; message: string; data?: any; }) => any; }) => {
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
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });

  }
});
routeCategorias.get("/:id", async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
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
  } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeCategorias.post("/", authMiddlewareCategorias, async (req: { body: { name: any; }; }, res: { json: (arg0: { message: string; status: number; }) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data: any; }): any; new(): any; }; }; }) => {
  const { name } = req.body;
  if (!name) return res.json({ message: "faltan datos", status: 401 });

  try {
    const query = await Categorys.create({ name });
    if (!query)
      return res.json({ status: 404, message: "No se pudo registrar" });
    return res.status(200).json({ message:"Categoria registrado", data:query})
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeCategorias.put("/:id", authMiddlewareCategorias, async (req: { params: { id: any; }; body: { data: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
    const {id} = req.params
    const {data} = req.body
  if (!id || !data) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Categorys.findByIdAndUpdate(id, {...data})
        if(!query) return res.json({status: 404, message: "No se pudo actualizar"})
        return res.json({status: 200 , message: "Categoria actualizada",data: query})
    } catch (error : string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
        
    } 
});

routeCategorias.delete("/:id", authMiddlewareCategorias, async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
    const {id} = req.params
  
    if (!id) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Categorys.findByIdAndDelete(id)
        if(!query) return res.json({ message: "No se pudo borrar", status: 404 });
    return res.json({ message:"Categoria borrada", status: 200 , data: query});
    } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
        
    }
});

module.exports = routeCategorias;
