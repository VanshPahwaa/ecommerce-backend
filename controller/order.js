const Order = require("../model/order")


const createOrder = async (req, res) => {
    try {
        const data = await Order.create(req.body)
        if (data) {
            res.status(200).json({
                data: data,
                success: true
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


const fetchAllOrder = async (req, res) => {
    try {
        const data = await Order.find({})
        if (data) {
            res.status(200).json({
                data: data,
                success: true
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


const fetchFilteredOrder = async (req, res) => {
    try {
        let queryCondition = {}
        if (req.query.userId) {
            queryCondition = { ...queryCondition, userId: req.query.userId }
        }
        if (req.query.orderStatus) {
            queryCondition = { ...queryCondition, orderStatus: req.query.orderStatus }
        }
        let query = Order.find(queryCondition).populate("cartItems.productId")
        if (req.query.sort && req.query.order) {
            query = query.sort({ [req.query.sort]: req.query.order })
        }
        const data = await query.exec()
        console.log(data)
        if (data) {
            res.status(200).json({
                success: true,
                data: data,
                message:"Orders Returned"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



module.exports = { createOrder, fetchAllOrder, fetchFilteredOrder }