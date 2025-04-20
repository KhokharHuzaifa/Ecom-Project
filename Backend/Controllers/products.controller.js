import { categoryModel } from "../Model/category.model.js";
import { productModel } from "../Model/product.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";


export default class productsController {
  async createProduct(req, res, next) {
        try {
          const data = req.body;         

          const uploadResult = await cloudinary.uploader.upload(data.productImage, {
            folder: "e-commerece-app",
          });

          if (uploadResult) {
            data.productImage = uploadResult.secure_url
          }
      
          const product = await productModel.create(data);
      
          if (!product) {
            return res.status(400).json({ message: "Product creation failed" });
          }
      
          
          const cat = await categoryModel.findByIdAndUpdate(
            data.category, 
            { $push: { products: product._id } }, 
            { new: true }
          );
      
      
          if (!cat) {
            return res.status(404).json({ message: "Category not found" });
          }          
      
          res.status(201).json({
            message: "Product added into database successfully",
            product,
          });
        } catch (err) {
          next(err);
        }
  }
  async getAllProducts(req, res, next) {
     const {minPrice,maxPrice,limit=3,page=1,category=''} = req.query
    try {
      
      let query = {}

      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);

      if(minPrice && maxPrice){
        query.price ={ $gte: Number(minPrice), $lte: Number(maxPrice) };
      }

      if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
          query.category = new mongoose.Types.ObjectId(category);
        } else {
          console.log("Invalid category ID format");
        }
      }

      const skip = (parsedPage - 1) * parsedLimit

      const data = await productModel.find(query).skip(skip).limit(parsedLimit)

      const total = await productModel.countDocuments(query)
      
      res.json({
        message: "All product route hit",
        data,
        success:true,
        page:parsedPage,
        total,
        pages:Math.ceil(total/parsedLimit)
      });
    } catch (err) {
      next(err);
    }
  }

  async getSingleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const singleProduct = await productModel.findById(id);
      res.json(
        singleProduct,
      );
    } catch (error) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.query;
      const data = req.body;
      const updatedProduct = await productModel.findByIdAndUpdate(id, data);
      res.json({
        message: "Update product route hit",
        updatedData: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.query;
      const prod = await productModel.findByIdAndDelete(id);
      res.json({
        message: "Delete product route hit",
        deletedProduct: {
          prod,
          flag: "This product deleted",
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
