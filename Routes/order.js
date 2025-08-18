const express=require("express")
const router=express.Router()

const {createOrder, fetchAllOrder, fetchFilteredOrder}=require("../controller/order")
const isAuthenticated = require("../utils/isAuthenticated")

router.use(isAuthenticated)
router.post("/",createOrder)
.get('/',fetchAllOrder)
.get('/filtered-orders',fetchFilteredOrder)


module.exports=router

