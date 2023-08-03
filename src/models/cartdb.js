import {model, Schema}  from "mongoose"

let collection = 'carts'

let schema = new Schema({
    products : [ { id: {type: Schema.Types.ObjectId, ref: 'Productdb', requiered:true}, quantity: {type: Number, default: 0} }] 
})

const Cartdb = model(collection,schema)

export default Cartdb
