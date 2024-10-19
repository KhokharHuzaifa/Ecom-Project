import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: String,
    price: Number,
    description: String,
    productImage: String,
    category:{
        type: Schema.Types.ObjectId,
        ref:'category'
    }
});

export const productModel = mongoose.model('product', productSchema);