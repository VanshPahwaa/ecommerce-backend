const express=require("express")
const isAuthenticated=require("../utils/isAuthenticated")
const {addToCart,fetchCart,updateCart,deleteCart}=require("../controller/cart")

const router=express.Router()
router.use(isAuthenticated)

router.post("/",addToCart)
.get("/:id",fetchCart)
.patch('/:id',updateCart)
.delete('/:id',deleteCart)


module.exports=router