import Stripe from "stripe"

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY 

export const webhooks = (req,res,next)=>{
    const signature = request.headers['stripe-signature'];
    let event 

    const payloadString = JSON.stringify(req.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret:endpointSecret,
      });

    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }


    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!');
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          console.log('PaymentMethod was attached to a Customer!');
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
}

 