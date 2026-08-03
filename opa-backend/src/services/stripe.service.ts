import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (stripeInstance) {
    return stripeInstance;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.warn("STRIPE_SECRET_KEY não configurada. Rotas de pagamento desabilitadas.");
    return null;
  }

  stripeInstance = new Stripe(secretKey);

  return stripeInstance;
}