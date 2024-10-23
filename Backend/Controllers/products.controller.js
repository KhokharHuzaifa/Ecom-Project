import { categoryModel } from "../Model/category.model.js";
import { productModel } from "../Model/product.model.js";

export default class productsController {
  async createProduct(req, res, next) {
        try {
          const data = req.body;
          console.log("Request Data: ", data); 
      
          const product = await productModel.create(data);
          console.log("Created Product: ", product); 
      
          if (!product) {
            return res.status(400).json({ message: "Product creation failed" });
          }
      
          
          const cat = await categoryModel.findByIdAndUpdate(
            data.category, 
            { $push: { products: product._id } }, 
            { new: true }
          );
      
          console.log("Updated Category: ", cat); 
      
          if (!cat) {
            return res.status(404).json({ message: "Category not found" });
          }
      
          res.status(201).json({
            message: "Product added into database successfully",
            product,
          });
        } catch (err) {
          console.error("Error creating product: ", err); 
          next(err);
        }
  }
  async getAllProducts(req, res, next) {
    try {
      const data = await productModel.find();
      console.log("getting all products...............",data);
      
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
      const { id } = req.query;
      const singleProduct = await productModel.findById(id);
      res.json({
        message: "Single product route hit",
        product: singleProduct,
      });
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
