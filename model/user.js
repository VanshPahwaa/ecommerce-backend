const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    addresses: [{ type: mongoose.Mixed }],
    resetPasswordToken:{type:mongoose.Schema.Types.String, default:null}
})
    userSchema.virtual("userId").get(function () {
            return this._id
        })



        const User = mongoose.model("User", userSchema)

        module.exports = User