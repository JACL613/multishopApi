const {Schema , model, default: mongoose} = require('mongoose')

const DespachosSchema = new Schema({
    name: String, 
    name_receiver: {type: String , required: true},
    city: {type: String , required: true},
    department: {type: String , required: true},
    district: {type: String , required: true},
    address: {type: String , required: true},
    user: {type: mongoose.Types.ObjectId, ref : 'Users', required: true},    
})

export const Despatchs = model('Despatchs' , DespachosSchema )
