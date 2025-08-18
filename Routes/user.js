const express = require("express")
const router = express.Router()


const { updateUser } = require("../controller/user")
const isAuthenticated = require("../utils/isAuthenticated")

router.use(isAuthenticated)
router.put("/:id", updateUser)

module.exports = router