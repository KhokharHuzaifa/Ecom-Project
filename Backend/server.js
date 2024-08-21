import express from 'express'
import productrouter from './Routes/routes.product.js'
import authrouter from "./Routes/routes.auth.js"
import userrouter from "./Routes/routes.user.js"
import bodyParser from 'body-parser'
import { connectDB } from './Config/db.js'
import 'dotenv/config'
import { errorHandler } from './middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

connectDB();
const app = express()

// cors config
var corsOptions = {
    origin: 'http://localhost:5173/',
}
app.use(cors())

// parsers middleware
app.use(bodyParser.json())
app.use(cookieParser())

// route mouting
app.use('/',productrouter)
app.use("/",authrouter)
app.use("/",userrouter)

// global error handler
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})