const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, default: 1 },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String },
    size: { type: String },
})


const orderSchema = new mongoose.Schema({
    userId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalAmount: { required: true, type: Number },
    paymentMethod: { required: true, type: String },
    selectedAddress: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
    cartItems: {
        type: [cartItemSchema],
        validate: {
            validator: function (value) {
                console.log(value)
                return Array.isArray(value) && value.length > 0;
            },
            message: "items must contain at least one value"
        },
        required: true
    },
    orderStatus: {
        type: String,
        enum: {
            values: ['pending', 'delivered', 'on transit'],
            message: `{VALUE}  is not a valid status`
        },
        default: "pending"
    },
    createAt:{
        type:Date,
        default: Date.now
    }
}, {
    timestamps: true
}, { strict: true })


const Order = mongoose.model('Order', orderSchema)

module.exports = Order