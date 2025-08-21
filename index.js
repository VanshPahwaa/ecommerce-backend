const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
require("dotenv").config()

app.set("trust proxy",1)

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


const productRouter = require("./Routes/product")
const authRouter = require("./Routes/auth")
const cartRouter = require("./Routes/cart")
const orderRouter = require("./Routes/order")
const userRouter = require("./Routes/user")




main()
app.listen(process.env.SERVER_PORT, () => {
    console.log("app is listening on port 8080")
})



async function main() {
    mongoose.connect(process.env.DB_URL).then(req => {
        console.log("db connected")
    }).catch(error => {
        console.log("error", error
        )
    })
}

const isproduction=process.env.ISPRODUCTION=='TRUE'

app.use(session({
    secret: process.env.COOKIE_SECRET_KEY,
    saveUninitialized: false,// initialize session id only when any value is assigned to session object by server
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        collectionName: "sessions",
        ttl: 60// use to manipulate the duration of cookie on db
    }),
    cookie: {
        secure: isproduction?true:false, //if true, cookie will be set on onlye https  
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // generally on clinet side
        sameSite:"none",
        path: "/"
    }

}))


app.use("/products", productRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/user", userRouter)

