import express from 'express'
import { makePayment } from '../Controllers/payment.controller.js'

const router = express.Router()

router.route('/create-checkout-session').post(makePayment)

export default router