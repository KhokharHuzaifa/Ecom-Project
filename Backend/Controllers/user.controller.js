import userModel from "../Model/user.model.js"

export class userController {
    createUser = async (req,res,next)=>{
    try {
        let user = req.body        
        await userModel.create(user)

        res.json({
            message:"User created successfully",
            user
        })
    } catch (error) {
        next(error)
    }
   }
    getAllusers = async (req,res,next)=>{
    try {
        const users = await userModel.find({})

        res.json({
            message:"All Products are fetched",
            users,
        })
    } catch (error) {
        next(error)
    }
   }
   getSingleuser = async (req,res,next)=>{
    try {
        const {id} = req.params 
        const user = await userModel.findById(id)
         res.json({
            message:"Single User successfully",
            user
         })
    } catch (error) {
        next(error)
    }
   }
   updateUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        const data = req.body
        const updateUser = await userModel.findByIdAndUpdate(id,data)

        res.json({
            message:"Update user successfully",
            updateUser,
        })
    } catch (error) {
        next(error)
    }
   }
   deleteUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        await userModel.findByIdAndDelete(id)

        res.json({
            message:"User deleted successfully"
        })
    } catch (error) {
        next(error)
    }
   }
}  