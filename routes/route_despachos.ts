const Despatchs = require('../databases/models/despachos_schema');
const routeDespachos = require('express').Router();


routeDespachos.get('/' , async (req: any , res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    try {
        const query = await Despatchs.find()
        if(!query || query.length < 1) return res.status(404).json({message: "No hay despachos registrados"})
    return res.status(200).json({message:"Despachos encontrados" ,data: query })
    } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });    
    }
})
routeDespachos.get('/:id' , async (req: { params: { id: any; }; } , res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    const {id} = req.params
    if(!id ) return res.status(404).json({message: "Faltan datos"})
    try {
        const query = await Despatchs.findById(id)
        if(!query || query.length < 1) return res.status(404).json({message: "No hay despachos registrados"})
    return res.status(200).json({message:"Despachos encontrados" ,data: query })
    } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });    
    }
})

routeDespachos.post('/' , async (req: { body: { name: any; name_receiver: any; city: any; department: any; district: any; address: any; user: any; }; } , res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    const {name , name_receiver , city , department , district , address , user} = req.body
    if(!name_receiver || !city || !department || !district || !address|| !user) return res.status(401).json({message: "Faltan datos"})
    try {
        const query = await Despatchs.create({name, name_receiver, city, department, district, address, user})
        if(!query) return res.status(400).json({message: "No se pudo registrar e despacho"})
    return res.status(200).json({ message: "Se creo el despacho con exito"})
    } catch (error:string | any) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
});

routeDespachos.put('/:id' , async (req: { params: { id: any; }; body: { data: any; }; } , res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    const { id } = req.params;
  const { data } = req.body;
  if (!id || !data) return res.status(401).json({ message: "Faltan datos" });
  try {
    const query = await Despatchs.findByIdAndUpdate(id, { ...data });
    if (!query)
      return res
        .status(404)
        .json({ message: "No se pudo actualizar el despacho" });
    return res
      .status(200)
      .json({ message: "Despacho actualizado con exito", data: query });
  } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  } 
})

routeDespachos.delete('/:id' , async (req: { params: { id: any; }; } , res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
    const {id} = req.params
    if (!id) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Despatchs.findByIdAndDelete(id)
        if(!query) return res.json({ message: "No se pudo borrar", status: 404 });
    return res.json({ message:"Despacho borrada", status: 200 , data: query});
    } catch (error:string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

module.exports = routeDespachos;