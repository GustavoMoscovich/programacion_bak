import {model, Schema}  from "mongoose"

let collection = 'products'

let schema = new Schema({
    title : {type:String, requiered:true},
    description : {type:String, requiered:true},
    code : {type:String, requiered:true,unique:true},
    price : {type:Number, default:0},
    status : {type:Boolean, default:true},
    stock : {type:Number, default:0},
    category : {type:String, requiered:true},
    thumbnails :{type:Array, requiered:true}
})

const Productdb = model(collection,schema)

export default Productdb