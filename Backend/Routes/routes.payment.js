import express from 'express'
import { makePayment } from '../Controllers/payment.controller.js'
import { webhooks } from '../Controllers/webHook.js'

const router = express.Router()

router.route('/create-checkout-session').post(makePayment)
router.route('/webhook').post(webhooks)

export default router