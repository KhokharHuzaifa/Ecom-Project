import { OrderModel } from "../Model/orderDetail.model.js";

export const orderDetail = async (req,res,next) => {   

    try {

        const {id} = req.user

        const orderList = await OrderModel.find({userId:id})  
        
        console.log("orderlist",orderList);
        

        res.json({
            data : orderList,
            message: "Order list Captured successfully...",
            success: true
        })
        
    } catch (error) {
        next(new Error("Failed to load OrderDetails..."))
    }
}