import { categoryModel } from "../Model/category.model.js";
import { v2 as cloudinary } from 'cloudinary';

export default class categoryController {

    async createCategory(req, res, next) {
        try {
            const data = req.body;
            
            const uploadResult = await cloudinary.uploader.upload(data.categoryImg, { folder: 'MernCart_Project' })
            .catch((error) => {
                next(error)
            });
            if (uploadResult) {
                data.categoryImg = uploadResult.secure_url
                await categoryModel.create(data);
                
                res.json({
                    message: 'category added into database successfully',
                    data
                })
            }
            
        } catch (err) {
            next(err)
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const data = await categoryModel.find({}).populate('products');
            
            res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async getSingleCategory(req, res, next) {
        try {
            const { id } = req.query
            const singleCategory = await categoryModel.findById(id)
            res.json({
                message: 'Single category route hit',
                category: singleCategory
            })
        } catch (error) {
            next(err)
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { id } = req.query
            const data = req.body
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, data)
            res.json({
                message: 'Update category route hit',
                updatedCategory: updatedCategory
            })
        } catch (err) {
            next(err)
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.query;
            const category = await categoryModel.findByIdAndDelete(id)
            res.json({
                message: 'Delete category route hit',
                deletedProduct: {
                    category,
                    flag: 'This category deleted'
                }
            })
        } catch (err) {
            next(err)
        }
    }
}