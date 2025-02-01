import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const My_Domain = 'http://localhost:5173'

export const makePayment = async  (req, res) => {

  console.log(".........................",req.body);
  
  
  //   const checkOutSession = await stripe.checkout.sessions.create({
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: 'usd',
  //           product_data: {
  //             name: 'sample product',
  //             description:"Nothing to write or the description is written here"
  //           },
  //           unit_amount: 5000,
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     success_url: `${My_Domain}?success=true`,
  //     cancel_url: `${My_Domain}?canceled=true`,
  // });
  
  //   res.redirect(303, checkOutSession.url);
  };