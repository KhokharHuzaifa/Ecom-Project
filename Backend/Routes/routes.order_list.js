import express from 'express'
import { orderDetail } from '../Controllers/order.controller.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.route('/order-list').get(isAuthenticated,orderDetail)

export default router