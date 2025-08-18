const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
   userId: { type: mongoose.ObjectId, ref:"user", required: true },
   productId: { type: mongoose.Schema.Types.ObjectId,ref:"Product", required: true },
   color:{type:String},
   size:{type:String},
   quantity: { type: Number, required: true }
})

cartSchema.virtual("id").get(function(){
    return this._id
})

cartSchema.set('toJSON',{
    // virtuals: true,
    // versionKey: true,
    transform: function (doc,ret) { 
        ret.id=ret._id
        delete ret._id}
})
const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart