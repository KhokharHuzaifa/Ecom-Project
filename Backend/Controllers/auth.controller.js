import { userModel } from '../Model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

export const signup = async (req, res, next) => {
    try {
        const user = req.body
        const uploadResult = await cloudinary.uploader.upload(user.avatar, { folder: 'MernCart_Project' })
            .catch((error) => {
                next(error)
            });
        if (uploadResult) {
            user.avatar = uploadResult.secure_url
            user.password = await bcrypt.hash(user.password, 10)
            await userModel.create(user)
            res.json({
                success: true,
                message: "SignUp successfully"
            })
        }
    } catch (error) {
        next(error)
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
            res.cookie("JWT", jwt_token, { maxAge: 900000, httpOnly: true }).json({
                message: "LogIn successfully Redirecting you please wait",
                validUser,
                success:true
            })
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("JWT", '').json({
            message: "Logout successfully",
        })
    } catch (error) {
     next(error)   
    }
}