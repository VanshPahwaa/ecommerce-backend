const express=require("express")
const router=express.Router()
const {login,signup,aboutMe,logout,forgetPassword,resetPassword}=require("../controller/auth")
const isAuthenticated=require("../utils/isAuthenticated")
const isLoggedin=require("../utils/isLoggedIn")

router.post("/login",isLoggedin,login)
.post("/signup",signup)
.get("/me",isAuthenticated,aboutMe)
.post("/logout",isAuthenticated,logout)
.post("/forget-password-request",forgetPassword)
.patch("/reset-password",resetPassword)


module.exports=router