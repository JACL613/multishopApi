const {Orders} = require("../databases/models/pedidos_schema");
const {authMiddleware: authMiddlewarePedidos} = require("../middleware/controller_user")


const route = require('express').Router();

route.get('/' , async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    try {
        const query = await Orders.find({});
        if (!query || query.length <= 0)
          return res.status(404).json({ message: "No hay pedidos registrados" });
        return res
          .status(200)
          .json({ message: "Pedidos encontrados", data: query });
      } catch (error:string | any) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

route.get("/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    
    const { id } = req.params;

    if (!id) return res.status(401).json({ message: "Faltan datos" });
    try {
        const query = await Orders.findById(id);
        if (!query || query.length <= 0)
        return res.status(404).json({ message: "No se encontro el producto" });
        return res
        .status(200)
        .json({ message: "Pedidio encontrado", data: query });
    } catch (error : string | any) {
        return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

route.post('/' ,authMiddlewarePedidos, async (req: { body: { created_at: any; status: any; payout: any; additional_info: any; user: any; product: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
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
        } catch (error:string | any) {
            return res.json({ message: `Error: ${error.message}`, status: 500 });
        }
});

route.put('/:id', authMiddlewarePedidos, async (req: { params: { id: any; }; body: { data: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    const { id } = req.params
    const {data} = req.body
    if (!id || !data) return res.status(401).json({ message: "Faltan datos" });
        try {
            const query = await Orders.findByIdAndUpdate(id, {...data})
            if(!query) return res.status(404).json({ message: "No se pudo actualizar el pedido"})
            return res.status(200).json({message: "Pedido actualizado", data: query})
        } catch (error:string | any) {
        return res.json({ message: `Error: ${error.message}`, status: 500 }); 
        }
})

route.delete('/:id', authMiddlewarePedidos, async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; data?: any; }): any; new(): any; }; }; json: (arg0: { message: string; status: number; }) => any; }) => {
    const {id} = req.params
    if (!id ) return res.status(401).json({ message: "Faltan datos" });
    try {
      const query = await Orders.findByIdAndDelete(id)
      if(!query) return res.status(404).json({ message: "No se pudo eliminar el pedido"})
      return res.status(200).json({ message:"Pedido eliminado", data: query})
    } catch (error:string | any) {
      return res.json({ message: `Error: ${error.message}`, status: 500 });
    }
})

module.exports = route;
