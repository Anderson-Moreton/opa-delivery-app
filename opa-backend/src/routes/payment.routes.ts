import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar pagamento",
    });
  }
});

export default router;
