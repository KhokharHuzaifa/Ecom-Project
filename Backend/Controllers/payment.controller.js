import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const My_Domain = 'http://localhost:5173'

export const makePayment = async  (req, res, next) => {
  try {
    if (!req.body || req.body.length === 0) {
      next(new Error("Product Error: Request body is empty"));
      return;
    }

    const lineItems = req.body.map((items) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: items.productName
        },
        unit_amount: Math.max(Math.round(items.price * 100), 50), // Minimum Stripe requirement
      },
      quantity: items.quantity,
    }));

    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${My_Domain}?success=true`,
      cancel_url: `${My_Domain}?canceled=true`,
    });

    console.log("Stripe Checkout Session Created:", checkOutSession);

    res.json({ id: checkOutSession.id });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    next(error); // Pass error to Express error handler
  }
  };