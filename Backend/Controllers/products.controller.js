import { categoryModel } from "../Model/category.model.js";
import { productModel } from "../Model/product.model.js";
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

          console.log("product........",product);
          
      
          res.status(201).json({
            message: "Product added into database successfully",
            product,
          });
        } catch (err) {
          next(err);
        }
  }
  async getAllProducts(req, res, next) {
    try {
      const data = await productModel.find();
      
      res.json({
        message: "All product route hit",
        data,
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
