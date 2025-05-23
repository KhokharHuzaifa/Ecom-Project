import { userModel } from '../Model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

export const signup = async (req, res, next) => {
    console.log("before try body..........",req.body);
    
    try {
        
        const user = req.body
        const uploadResult = await cloudinary.uploader.upload(user.avatar, { folder: 'MernCart_Project' })
        .catch((error) => {
            next(new Error("Failed to upload you image"))
        });
        
        if (uploadResult) {
            user.avatar = uploadResult.secure_url
            user.password = await bcrypt.hash(user.password, 10)
            let u = await userModel.create(user)

            console.log("After creation.........",u);
            
            res.json({
                success: true,
                message: "SignUp successfully"
            })
        }
    } catch (error) {
        next(new Error("There is some Error in Database.Try Again"))
    }
}

export const login = async (req, res, next) => {
    try {        
        const user = req.body

        const validUser = await userModel.findOne({ email: user.email })

        if (validUser == null) return next(new Error("Not Valid Email"))

        const decodeUser = await bcrypt.compare(user.password, validUser.password)

        if (!decodeUser) return next(new Error("Incorrect Password"))            

        const jwt_token = jwt.sign({
            id: validUser._id,
            username: validUser.username,
            role: validUser.roles
        }, process.env.JWT_SECRET)        

        try {
            res.cookie("JWT", jwt_token, { maxAge: 9000000, httpOnly: true }).json({
                message: "LogIn successfully Redirecting you, please wait",
                validUser,
                success:true
            })
        } catch (error) {
            next(new Error("There is some Error in Database.Try Again"))
        }

    } catch (error) {
        next(new Error("TNetwork Error.Try Again"))
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("JWT", '').json({
            message: "Logout successfully",
        })
    } catch (error) {
     next(new Error("Failed to Logout"))   
    }
}