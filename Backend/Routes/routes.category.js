import express from 'express'
import categoryController from '../Controllers/category.controller.js'
import { isAuthenticated, isAuthorized } from '../middleware/auth.js'

const router = express.Router()

const category = new categoryController()

router.route('/category/all').get(category.getAllCategory)
router.route('/category/:id').get(category.getSingleCategory)
router.route('/category/new').post(category.createCategory)
router.route('/category/update/:id').put(category.updateCategory)
router.route('/category/delete/:id').delete(category.deleteCategory)

export default router



