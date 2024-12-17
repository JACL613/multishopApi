const {Schema, model, default: mongoose} = require('mongoose')

const CategorysSchema = new Schema( {
    name: {type: String, required: true},
    total_products: {type: Number, required: true, default: 0},
    products: {type: [mongoose.Types.ObjectId], ref: 'Products'}
})

export const Categorys =  model( 'Categorys',CategorysSchema)

