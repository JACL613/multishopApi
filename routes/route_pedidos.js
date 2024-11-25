const Orders = require("../databases/models/pedidos_schema");
const authMiddleware = require("../middleware/controller_user");

const route = require('express').Router();

route.get('/' , async (req, res) => {
    try {
        const query = await Orders.find({});
        if (!query || query.length <= 0)
          return res.status(404).json({ message: "No hay pedidos registrados" });
        return res
          .status(200)
          .json({ message: "Pedidos encontrados", data: query });
      } catch (error) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

route.get("/:id", async (req, res) => {
    
    const { id } = req.params;

    if (!id) return res.status(401).json({ message: "Faltan datos" });
    try {
        const query = await Orders.findById(id);
        if (!query || query.length <= 0)
        return res.status(404).json({ message: "No se encontro el producto" });
        return res
        .status(200)
        .json({ message: "Pedidio encontrado", data: query });
    } catch (error) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

route.post('/' ,authMiddleware, async (req, res) => {
    const {
        created_at,
        status,
        payout,
        additional_info,
        user,
        product
    } = req.body;
    if ( !status || !payout || !additional_info || !user || !product)
        return res.status(401).json({ message: "Faltan datos" });
        try {
            const query = await Orders.create({
                created_at,
                status,
                payout,
                additional_info,
                user,
                product
            });
            if (!query)
                return res
                    .status(404)
                    .json({ message: "No se pudo realizar el pedido" });
            return res.status(200).json({ message: "Pedido creado", data: query });
        } catch (error) {
            return res.json({ message: `Error: ${error.message}`, status: 500 });
        }
});

route.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const {data} = req.body
    if (!id || !data) return res.status(401).json({ message: "Faltan datos" });
        try {
            const query = await Orders.findByIdAndUpdate(id, {...data})
            if(!query) return res.status(404).json({ message: "No se pudo actualizar el pedido"})
            return res.status(200).json({message: "Pedido actualizado", data: query})
        } catch (error) {
        return res.json({ message: `Error: ${error.message}`, status: 500 }); 
        }
})

route.delete('/:id', authMiddleware, async (req, res) => {
    const {id} = req.params
    if (!id ) return res.status(401).json({ message: "Faltan datos" });
    try {
      const query = await Orders.findByIdAndDelete(id)
      if(!query) return res.status(404).json({ message: "No se pudo eliminar el pedido"})
      return res.status(200).json({ message:"Pedido eliminado", data: query})
    } catch (error) {
      return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

module.exports = route;
