import mongoose, { Schema } from "mongoose";

const orderDetailSchema = new Schema({
    _product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        require: true
    },
    amount:{
        type:Number
    }
})

const orderSchema = new Schema({
    _customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    orderDetails:[
        {
            type:orderDetailSchema
        }
    ],
    orderDate:{
        type:Date,
        default: Date.now()
    },
    totalAmount:{
        type:Number
    },
    paymentId:{
        type: String
    }

})

export const Order = mongoose.model('orders',orderSchema)
export const OrderDetails = mongoose.model('orderDetails',orderDetailSchema)