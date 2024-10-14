import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category:String,
    image : String
});

export const productModel = mongoose.model('product', productSchema);