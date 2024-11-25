const {Schema , model, default: mongoose} = require('mongoose')

const ProductosSchema = new Schema ({
    title: {type : String, required: true},
    description: {type : String, required: true},
    image: {type : String, required: true},
    status: {type: Boolean, default: false},
    alt:  {type : String},
    link: {type : String},
    price: {type: Number, required: true},
    amount: {type : Number, required: true},
    category: {type: mongoose.Types.ObjectId, ref: 'Categorys'},
})

const Products = model('Products', ProductosSchema)

module.exports = Products