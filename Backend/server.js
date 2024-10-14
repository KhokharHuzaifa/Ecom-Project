import express from 'express'
import productrouter from './Routes/routes.product.js'
import authrouter from "./Routes/routes.auth.js"
import userrouter from "./Routes/routes.user.js"
import categoryrouter from "./Routes/routes.category.js"
import bodyParser from 'body-parser'
import { connectDB } from './Config/db.js'
import 'dotenv/config'
import { errorHandler } from './middleware/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

connectDB();
const app = express()

// cloudinary setup 
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// cors config
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true 
}
app.use(cors(corsOptions))

// parsers middleware
app.use(bodyParser.json({limit:'50mb'}))
app.use(cookieParser())

// route mouting
app.use('/',productrouter)
app.use("/",authrouter)
app.use("/",userrouter)
app.use("/",categoryrouter)

// global error handler
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})