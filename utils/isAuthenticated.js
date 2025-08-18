const isAuthenticated = async (req, res,next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(402).json({
            success: false,
            message: "not authorized"
        })
    }
}

module.exports = isAuthenticated