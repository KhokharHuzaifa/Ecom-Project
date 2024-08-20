import userModel from "../Model/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    try {
        const user = req.body

       user.password = await bcrypt.hash(user.password, 10)

        await userModel.create(user)

        res.json({
            message:"SignUp successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next)=>{
    try {
        const user = req.body

        const validUser = await userModel.findOne({username:user.username})        

        if(validUser == null) return next(new Error("Not Valid UserName"))
        
        const decodeUser = await bcrypt.compare(user.password,validUser.password)

        if(!decodeUser) return next(new Error("Incorrect Password"))

        const jwt_token = jwt.sign({
                id:validUser._id,
                username:validUser.username,
                role: validUser.roles
            }, process.env.JWT_SECRET)
        
        try {
            res.cookie("JWT",jwt_token,{maxAge:900000,httpOnly:true}).json({
                message:"LogIn successfully",
                jwt_token
            })
        } catch (error) {
            next(error)
        }
        
    } catch (error) {
        next(error)
    }
}

export const logout = async (req,res,next)=>{
    
}