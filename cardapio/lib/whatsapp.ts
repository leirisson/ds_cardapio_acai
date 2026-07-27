import { CartItem, Customer, DeliveryMethod, PaymentMethod } from "./types";
import { cartTotal } from "./store/cart";

const paymentLabels: Record<PaymentMethod, string> = {
  dinheiro: "Dinheiro",
  cartao: "Cartão",
  pix: "Pix",
};

const deliveryLabels: Record<DeliveryMethod, string> = {
  delivery: "Delivery",
  retirada: "Retirada",
};

const deliveryEmojis: Record<DeliveryMethod, string> = {
  delivery: "🛵",
  retirada: "🏠",
};

const paymentEmojis: Record<PaymentMethod, string> = {
  dinheiro: "💵",
  cartao: "💳",
  pix: "🔑",
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const DIVIDER = "▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️▫️";

export function buildOrderMessage(
  items: CartItem[],
  customer: Customer,
  deliveryMethod: DeliveryMethod,
  paymentMethod: PaymentMethod,
  changeFor?: number,
  notes?: string
) {
  const lines: string[] = [];

  lines.push("🍇 *AÇAÍ DO DS* 🍇");
  lines.push("✅ *Novo pedido recebido!*");
  lines.push(DIVIDER);

  lines.push("👤 *DADOS DO CLIENTE*");
  lines.push(`Nome: ${customer.nome}`);
  lines.push(`📱 WhatsApp: ${customer.whatsapp}`);
  if (customer.email) {
    lines.push(`✉️ E-mail: ${customer.email}`);
  }
  lines.push(DIVIDER);

  lines.push("🛒 *ITENS DO PEDIDO*");
  for (const item of items) {
    lines.push(
      `▪️ ${item.quantity}x ${item.product.nome} — ${formatCurrency(item.product.preco * item.quantity)}`
    );
  }
  lines.push(`💰 *Total: ${formatCurrency(cartTotal(items))}*`);
  lines.push(DIVIDER);

  lines.push(`${deliveryEmojis[deliveryMethod]} *ENTREGA: ${deliveryLabels[deliveryMethod].toUpperCase()}*`);
  if (deliveryMethod === "delivery") {
    const { rua, numero, bairro, complemento, cidade } = customer.endereco;
    lines.push(`📍 ${rua}, ${numero} - ${bairro}${complemento ? ` (${complemento})` : ""}`);
    lines.push(`🏙️ ${cidade}`);
  }
  lines.push(DIVIDER);

  lines.push(`${paymentEmojis[paymentMethod]} *PAGAMENTO: ${paymentLabels[paymentMethod].toUpperCase()}*`);
  if (paymentMethod === "dinheiro" && changeFor) {
    lines.push(`💸 Troco para: ${formatCurrency(changeFor)}`);
  }

  if (notes) {
    lines.push(DIVIDER);
    lines.push("📝 *OBSERVAÇÕES*");
    lines.push(notes);
  }

  lines.push(DIVIDER);
  lines.push("🙏 Obrigado pela preferência!");

  return lines.join("\n");
}

export function buildWhatsappLink(message: string) {
  // telefone whatsapp
  const phone = 5592988525784;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
