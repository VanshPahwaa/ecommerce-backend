const Product = require("../model/product")

const createProduct = async (req, res) => {
    try {
        const data = await Product.create(req.body)
        console.log("data returned", data)
        res.status(200).json({
            success: true,
            message: "uploaded"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


const getProducts = async (req, res) => {
    try {
        queryCondition = {}

        if (req.query.category) {
            if (Array.isArray(req.query.category)) {
                queryCondition = { ...queryCondition, category: { $in: req.query.category } }
            } else {
                queryCondition = { ...queryCondition, category: req.query.category }
            }
        }
        if (req.query.brand) {
            queryCondition = { ...queryCondition, brand: req.query.brand }
        }
        if (req.query.category) {
            queryCondition = { ...queryCondition, category: req.query.category }
        }
        const totalProducts = await Product.find().countDocuments(queryCondition).exec()
        query = Product.find(queryCondition)
        if (req.query._sort) {
            query.sort({ [req.query._sort]: req.query.ord })
        }
        if (req.query._per_page && req.query._page) {
            query.skip((req.query._page - 1) * req.query._per_page).limit(req.query._per_page)
        }


        const data = await query.exec()


        res.status(200).json({
            success: true,
            message: "product fetched",
            data: data,
            totalProducts: totalProducts

        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Product.findById(id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "product fetched",
            data: data
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


const updateProductById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "product not updated"
            })
        }
        console.log("data returned", data)
        res.status(200).json({
            success: true,
            message: "product updated",
            data: data
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


const createManyProduct = async (req, res) => {
    try {
        const data = await Product.insertMany(req.body, { odered: true, rawResult: true })
        res.status(200).json({
            success: true,
            message: "uploaded"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


module.exports = { createProduct, getProducts, getProductById, updateProductById, createManyProduct }