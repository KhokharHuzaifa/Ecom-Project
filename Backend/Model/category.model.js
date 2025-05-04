import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type:String,
        unique:true
    },
    categoryImg : String,
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
    ]
});

export const categoryModel = mongoose.model('category', categorySchema);