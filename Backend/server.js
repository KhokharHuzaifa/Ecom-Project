import express from 'express'
import productrouter from './Routes/routes.product.js'
import authrouter from "./Routes/routes.auth.js"
import userrouter from "./Routes/routes.user.js"
import bodyParser from 'body-parser'
import { connectDB } from './Config/db.js'
import 'dotenv/config'
import { errorHandler } from './middleware/error.js'
import cookieParser from 'cookie-parser'

connectDB();
const app = express()

// body parser middleware
app.use(bodyParser.json())
app.use(cookieParser())


//sdkhfksdk sdfsdk sdfksdhk

// route mouting
app.use('/',productrouter)

app.use("/",authrouter)

app.use("/",userrouter)

// global error handler
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port 8000`);
})