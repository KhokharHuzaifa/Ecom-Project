import express from 'express'
import { makePayment } from '../Controllers/payment.controller.js'
// import { webhooks } from '../Controllers/webHook.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.route('/create-checkout-session').post(isAuthenticated,makePayment)

export default router