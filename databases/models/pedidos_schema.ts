const { Schema , model, default: mongoose} = require('mongoose')

const PedidosSchema = new Schema(
{
    created_at: {type: Date, required: true , default: new Date()},
    status: {type: String, required: true, enum: ['pending', 'dispatch' , 'comfirm']},
    payout: {type: Boolean, required: true},
    additional_info: {type: mongoose.Types.ObjectId, ref: 'Despatchs', required: true},
    user: {type: mongoose.Types.ObjectId, ref: 'Users', required: true},
    product: {type: mongoose.Types.ObjectId, ref: 'Products', required: true},
}
)
export const Orders = model('Orders' , PedidosSchema)
