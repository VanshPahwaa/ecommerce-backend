const express = require("express");
const { createProduct, getProducts,getProductById,updateProductById,createManyProduct } = require("../controller/product");
const isAuthenticated = require("../utils/isAuthenticated");
const router = express.Router();

router.use(isAuthenticated)
router.post("/", createProduct)
    .get("/", getProducts)
.get('/:id',getProductById)
.patch('/:id',updateProductById)
.post('/many',createManyProduct)




module.exports = router
