import { OrderModel } from "../Model/orderDetail.model.js";

export const orderDetail = async (req,res,next) => {

    console.log("Inside orderDetails.................");
    console.log("Inside orderDetails.................",req.user);
    

    try {

        const {id} = req.user
console.log("User Id...............",id);

        const orderList = await OrderModel.find()



        console.log("Order Data: ", orderList);
        

        res.json({
            data : orderList,
            message: "Order list Captured successfully...",
            success: true
        })
        
    } catch (error) {
        next(new Error("Failed to load OrderDetails..."))
    }
}