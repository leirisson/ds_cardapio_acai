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

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function buildOrderMessage(
  items: CartItem[],
  customer: Customer,
  deliveryMethod: DeliveryMethod,
  paymentMethod: PaymentMethod,
  changeFor?: number,
  notes?: string
) {
  const lines: string[] = [];

  lines.push("*Novo pedido*");
  lines.push("");
  lines.push(`*Cliente:* ${customer.nome}`);
  lines.push(`*WhatsApp:* ${customer.whatsapp}`);
  if (customer.email) {
    lines.push(`*E-mail:* ${customer.email}`);
  }
  lines.push("");
  lines.push("*Itens:*");
  for (const item of items) {
    lines.push(
      `${item.quantity}x ${item.product.nome} - ${formatCurrency(item.product.preco * item.quantity)}`
    );
  }
  lines.push("");
  lines.push(`*Total: ${formatCurrency(cartTotal(items))}*`);
  lines.push("");
  lines.push(`*Forma de entrega:* ${deliveryLabels[deliveryMethod]}`);
  if (deliveryMethod === "delivery") {
    const { rua, numero, bairro, complemento, cidade } = customer.endereco;
    lines.push(`Endereço: ${rua}, ${numero} - ${bairro}${complemento ? ` (${complemento})` : ""}`);
    lines.push(`Cidade: ${cidade}`);
  }
  lines.push("");
  lines.push(`*Forma de pagamento:* ${paymentLabels[paymentMethod]}`);
  if (paymentMethod === "dinheiro" && changeFor) {
    lines.push(`Troco para: ${formatCurrency(changeFor)}`);
  }
  if (notes) {
    lines.push("");
    lines.push(`*Observações:* ${notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsappLink(message: string) {
  // telefone whatsapp
  const phone = 5592988525784;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
