import mongoose, { Schema } from "mongoose";

// const orderDetailSchema = new Schema({
//   _product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "product",
//     require: true,
//   },
//   price: {
//     type: Number,
//   },
//   quantity: {
//     type: Number,
//     require: true,
//   },
//   amount: {
//     type: Number,
//   },
// });

const orderSchema = new Schema({
  userId: {
    type:String,
    default: "",
  },
  productDetails: {
    type: Array,
    default: [],
  },
  email: {
    type: String,
    default: "",
  },
  paymentDetails:{
    paymentId : {
        type:String,
        default:""
    },
    payment_method_types : [],
    payment_status : {
        type:String,
        default:""
    }
  },
  shipping_options : [],
  totalAmount: {
    type:Number,
    default:0
  }
},{
    timestamps:true
});

export const OrderModel = mongoose.model("order", orderSchema);
// export const OrderDetails = mongoose.model("orderDetails", orderDetailSchema);
