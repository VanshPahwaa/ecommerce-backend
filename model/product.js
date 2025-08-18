const mongoose = require("mongoose")

const varientSchema = new mongoose.Schema({ type: Map, of: [String] })

const productSchema = new mongoose.Schema({
    title: { required: true, type: String, unique: true },
    description: { required: true, type: String },
    category: { required: true, type: String },
    price: { required: true, type: Number },
    discountPercentage: { required: true, type: Number },
    brand: { required: true, type: String },
    rating: { required: true, type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max rating'], default: 0 },
    stock: { required: true, type: Number, min: [0, 'wrong min stack'], default: 0 },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    colors: { type: [String], default: [] },
    size: { type: [String], default: [] },
    varient: { type: [varientSchema], default: [] }
})



productSchema.set('toJSON', {
    // virtuals: true,
    // versionKey: true,
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
    }
})
const Product = mongoose.model("Product", productSchema)
module.exports = Product