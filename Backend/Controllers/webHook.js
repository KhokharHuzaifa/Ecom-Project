import Stripe from "stripe";
import { OrderModel } from "../Model/orderDetail.model.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export const webhooks = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event;

  const payloadString = req.body;

  // const header = stripe.webhooks.generateTestHeaderString({
  //     payload: payloadString,
  //     secret:endpointSecret,
  //   });

  const getLineItems = async (lineItems) => {
    let productItems = [];

    if (lineItems?.data?.length) {
      for (const item of lineItems.data) {
        const product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId;

        const productData = {
          productId: productId,
          name: product.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
        };
        productItems.push(productData);
      }
    }

    return productItems;
  };

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      signature,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.user,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_types: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options,
        totalAmount: session.amount_total / 100,
      };

      const order = new OrderModel(orderDetails);

      const saveOrder = await order.save();

      break;
    case "payment_method.attached":
      // const paymentMethod = event.data.object;
      // console.log("PaymentMethod was attached to a Customer!", paymentMethod);
      break;
    case "payment_intent.created":
      // console.log("Payment Intent created:", event.data.object);
      break;
    case "payment_intent.succeeded":
      // console.log("Payment Intent created:", event.data.object);
      break;
    case "charge.updated":
      // console.log("charge updated:", event.data.object);
      break;
    case "charge.succeeded":
      // console.log("charge succeeded:", event.data.object);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};
