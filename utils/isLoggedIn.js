const isLoggedin = async (req, res, next) => {
    if (req.session.user) {
        res.json({
            message: "already logged in"
        })
    } else {
        next()
    }
}

module.exports = isLoggedin