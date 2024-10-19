import express from 'express'
import productsController from '../Controllers/products.controller.js'
import { isAuthenticated, isAuthorized } from '../middleware/auth.js'

const router = express.Router()

const product = new productsController()

router.route('/product/all').get(product.getAllProducts)
router.route('/product/:id').get(product.getSingleProduct)
router.route('/product/new').post(product.createProduct)
router.route('/product/update/:id').put(product.updateProduct)
router.route('/product/delete/:id').delete(product.deleteProduct)

export default router



