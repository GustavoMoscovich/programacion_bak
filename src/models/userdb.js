import {model, Schema}  from "mongoose"

let collection = 'users'

let schema = new Schema({
    name : {type:String, requiered:true},
    email : {type:String, requiered:true,unique:true, index:true},
    password : {type:String, requiered:true},
    role : {type:Number, default:0}
})

const Userdb = model(collection,schema)

export default Userdb