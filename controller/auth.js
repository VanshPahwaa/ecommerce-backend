const { sendMail } = require("../utils/mail")
const crypto = require('crypto')
const User = require("../model/user")
const mongoose = require("mongoose")

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await User.findOne({ email: email })
        if (data) {
            if (data.password == password) {
                const userData = {
                    role: data.role,
                    email: data.email,
                    userName: data.userName,
                    userId: data.id,
                    addresses: data.addresses
                }
                if (!req.session.user) {
                    req.session.user = null
                    console.log(req.session.user)
                }
                req.session.user = userData
                return res.status(200).json({
                    success: true,
                    message: "authenticated",
                    data: userData
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "User not authenticated"
                })
            }
        } else {

            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

const signup = async (req, res) => {
    try {
        const data = await User.create(req.body)
        if (!data) {
            res.status(500).json({
                success: false,
                message: "user not created",
            })

        }

        res.status(200).json({
            success: true,
            message: "user created",
            data: data
        })
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

const aboutMe = async (req, res) => {
    const data = await User.findById(req.session.user.userId).exec()
    const userData = {
        email: data.email,
        userName: data.userName,
        userId: data.id,
        addresses: data.addresses,
        // role:data.role

    }

    res.status(200).json({
        data: userData,
        success: true
    })

}

const logout = async (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Logout"
                })
            }
            res.clearCookie("connect.sid", {
                path: '/',
                httpOnly: true,
                secure: false
            })
            return res.status(200).json({
                message: "logged out successfully "
            });
        });

    } catch (error) {
        res.statu(500).json({
            success: false,
            message: error.message
        })
    }
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await User.findOne({ email: email })
        if (data) {
            var token = crypto.randomBytes(48).toString("hex")
            data.resetPasswordToken = token
            data.save()
            const resetPageLink =process.env.CLIENT_URL+'/reset-password?token=' + token + '&email=' + email;
            const htmlData = `<p>Click here for <a href='${resetPageLink}'>reset password</a></p>`
            const response = await sendMail({ to: data.email, subject: "Link for reset password", text: "", html: htmlData })
            return res.status(200).json({
                success: true,
                message: "Mail sent",
                data: response.response
            })
        }
        res.status(404).json({
            success: false,
            message: "Enter Valid Email",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            messaage: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password, resetPasswordToken } = req.body;
        const user = await User.findOne({ email: email, resetPasswordToken: resetPasswordToken })
        if (user) {
            user.password = password;
            user.resetPasswordToken = null;
            const result = await user.save()
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Password reset"
                })
            }
        } else {
            res.status(200).json({
                success: false,
                message: "link expired"
            })
        }
    }
    catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }

}

module.exports = { login, signup, aboutMe, logout, forgetPassword, resetPassword }