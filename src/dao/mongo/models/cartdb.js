import {model, Schema}  from "mongoose"

let collection = 'carts'

let schema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'products', requiered:true},
    quantity: {type: Number, default: 0},
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    price: { type: Number, required: true },

})

schema.pre('find', function () {
    this.populate("product_id", { description: 0 });
});

const Cartdb = model(collection,schema)

export default Cartdb
