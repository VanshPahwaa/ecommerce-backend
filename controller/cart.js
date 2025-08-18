const Cart = require("../model/cart")
const mongoose = require("mongoose")

const addToCart = async (req, res) => {
    try {
        const { productId, userId,color,size } = req.body
        const cartProduct = await Cart.find({ productId: productId, userId: userId,size:size,color:color })
        if (cartProduct.length) {
            cartProduct[0].quantity = cartProduct[0].quantity + 1
            const updatedItem = await cartProduct[0].save()

            res.status(200).json({
                success: true,
                message: "quantity updated",
                data: updatedItem
            })


        } else {
            const data = await Cart.create({ ...req.body, quantity: 1 })
            res.status(200).json({
                success: true,
                message: "item Added",
                data: data
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


const fetchCart = async (req, res) => {
    try {
        const id = req.params.id
        const cartItems = await Cart.find({ userId: id })
            .populate("productId").exec()

        if (cartItems) {
            res.status(200).json({
                success: true,
                message: "quantity fetched",
                data: cartItems
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const id = req.params.id
        const updatedItem = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate('productId')
        if (updatedItem) {
            res.status(200).json({
                success: true,
                message: "cart Updated",
                data: updatedItem
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id
        const isDeleted = await Cart.findByIdAndDelete(id)
        if (isDeleted) {
            res.status(200).json({
                success: true,
                message: "deleted",
                data: isDeleted
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}




module.exports = { addToCart, fetchCart, updateCart, deleteCart }