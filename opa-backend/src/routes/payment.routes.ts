import { Router } from "express";
import { getStripe } from "../services/stripe.service";

const router = Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const stripe = getStripe();

    if (!stripe) {
      return res.status(503).json({
        error: "Serviço de pagamento indisponível.",
      });
    }

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

router.post("/create-pix-payment-intent", async (req, res) => {
  try {
    const stripe = getStripe();

    if (!stripe) {
      return res.status(503).json({
        error: "Serviço de pagamento indisponível.",
      });
    }

    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      payment_method_types: ["pix"],
    });

    const confirmedIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method_data: {
          type: "pix",
          billing_details: {
            name: "Teste PIX",
            email: "teste@opafood.com",
            tax_id: "11144477735",
          },
        },
      },
    );

    res.json({
      clientSecret: confirmedIntent.client_secret,
      paymentIntentId: confirmedIntent.id,
      qrCode: confirmedIntent.next_action?.pix_display_qr_code?.image_url_png,
      pixCode: confirmedIntent.next_action?.pix_display_qr_code?.data,
      instructionsUrl:
        confirmedIntent.next_action?.pix_display_qr_code
          ?.hosted_instructions_url,
    });
  } catch (error) {
    console.error("PIX ERROR:", error);

    res.status(500).json({
      error: "Erro ao criar PIX",
      details: error,
    });
  }
});

router.get("/payment-status/:id", async (req, res) => {
  try {
    const stripe = getStripe();

    if (!stripe) {
      return res.status(503).json({
        error: "Serviço de pagamento indisponível.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

    res.json({
      status: paymentIntent.status,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao consultar pagamento",
    });
  }
});

export default router;
