import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: String,
    categoryImg : String
});

export const categoryModel = mongoose.model('category', categorySchema);