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
    } catch (error) {
        
    }
})

route.put('/:id' , (req , res) => {

})

route.delete('/:id' , (req , res) => {

})

module.exports = route;
