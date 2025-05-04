import Stripe from "stripe";
import { userModel } from "../Model/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const My_Domain = "http://localhost:5173";

export const makePayment = async (req, res, next) => {
  try {
    const id = req.user.id

    const validUser = await userModel.findById(id);
   
    if (!req.body || req.body.length === 0) {
      next(new Error("Product Error: Request body is empty"));
      return;
    }

    const lineItems = req.body.map((items) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: items.productName,
          metadata:{
            productId : items._id
          },
        },
        unit_amount: Math.max(Math.round(items.price * 100), 50), // Minimum Stripe requirement
      },
      quantity: items.quantity,
    }));
    
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email:validUser.email,
      metadata:{
        user:req.user.id
      },
      success_url: `${My_Domain}/success`,
      cancel_url: `${My_Domain}/cancel`,
    });

    // console.log("Stripe Checkout Session Created:", checkOutSession);

    res.json({ 
      id: checkOutSession.id,
      data: checkOutSession
    });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    next(error); // Pass error to Express error handler
  }
};
