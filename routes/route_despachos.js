const Despatchs = require('../databases/models/despachos_schema');

const route = require('express').Router();

route.get('/' , async (req , res) => {
    try {
        const query = await Despatchs.find()
        if(!query || query.length < 1) return res.status(404).json({message: "No hay despachos registrados"})
    return res.status(200).json({message:"Despachos encontrados" ,data: query })
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });    
    }
})
route.get('/:id' , async (req , res) => {
    const {id} = req.params
    if(!id ) return res.status(404).json({message: "Faltan datos"})
    try {
        const query = await Despatchs.findById(id)
        if(!query || query.length < 1) return res.status(404).json({message: "No hay despachos registrados"})
    return res.status(200).json({message:"Despachos encontrados" ,data: query })
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });    
    }
})

route.post('/' , async (req , res) => {
    const {name , name_receiver , city , department , district , address , user} = req.body
    if(!name_receiver, !city, !department, !district, !address, !user) return res.status(401).json({message: "Faltan datos"})
    try {
        const query = await Despatchs.create({name, name_receiver, city, department, district, address, user})
        if(!query) return res.status(400).json({message: "No se pudo registrar e despacho"})
    return res.status(200).json({ message: "Se creo el despacho con exito"})
    } catch (error) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
});

route.put('/:id' , async (req , res) => {
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
  } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  } 
})

route.delete('/:id' , async (req , res) => {
    const {id} = req.params
    if (!id) return res.json({ message: "faltan datos", status: 401 });
    try {
        const query = await Despatchs.findByIdAndDelete(id)
        if(!query) return res.json({ message: "No se pudo borrar", status: 404 });
    return res.json({ message:"Despacho borrada", status: 200 , data: query});
    } catch (error) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

module.exports = route;
