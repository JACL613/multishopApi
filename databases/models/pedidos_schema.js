const { Schema , model, default: mongoose} = require('mongoose')

const PedidosSchema = new Schema(
{
    created_at: {type: Date, required: true},
    status: {type: String, required: true, enum: ['pending', 'dispatch' , 'comfirm']},
    payout: {type: Boolean, required: true},
    additional_info: {type: mongoose.Types.ObjectId, ref: 'Despatchs'},
    user: {type: mongoose.Types.ObjectId, ref: 'Users'},
    product: {type: mongoose.Types.ObjectId, ref: 'Products'},
}
)
const Orders = model(PedidosSchema, 'Orders')

moduele.exports = Orders