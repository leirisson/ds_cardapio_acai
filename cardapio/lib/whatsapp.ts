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

const DIVIDER = "------------------------------";

export function buildOrderMessage(
  items: CartItem[],
  customer: Customer,
  deliveryMethod: DeliveryMethod,
  paymentMethod: PaymentMethod,
  changeFor?: number,
  notes?: string
) {
  const lines: string[] = [];

  lines.push("====================");
  lines.push("*AÇAÍ DO DS*");
  lines.push("*Novo pedido recebido!*");
  lines.push("====================");

  lines.push("");
  lines.push("*DADOS DO CLIENTE*");
  lines.push(DIVIDER);
  lines.push(`Nome: ${customer.nome}`);
  lines.push(`WhatsApp: ${customer.whatsapp}`);
  if (customer.email) {
    lines.push(`E-mail: ${customer.email}`);
  }

  lines.push("");
  lines.push("*ITENS DO PEDIDO*");
  lines.push(DIVIDER);
  for (const item of items) {
    lines.push(
      `${item.quantity}x ${item.product.nome} - ${formatCurrency(item.product.preco * item.quantity)}`
    );
  }
  lines.push(DIVIDER);
  lines.push(`*Total: ${formatCurrency(cartTotal(items))}*`);

  lines.push("");
  lines.push(`*ENTREGA: ${deliveryLabels[deliveryMethod].toUpperCase()}*`);
  lines.push(DIVIDER);
  if (deliveryMethod === "delivery") {
    const { rua, numero, bairro, complemento, cidade } = customer.endereco;
    lines.push(`Endereço: ${rua}, ${numero} - ${bairro}${complemento ? ` (${complemento})` : ""}`);
    lines.push(`Cidade: ${cidade}`);
  }

  lines.push("");
  lines.push(`*PAGAMENTO: ${paymentLabels[paymentMethod].toUpperCase()}*`);
  lines.push(DIVIDER);
  if (paymentMethod === "dinheiro" && changeFor) {
    lines.push(`Troco para: ${formatCurrency(changeFor)}`);
  }

  if (notes) {
    lines.push("");
    lines.push("*OBSERVAÇÕES*");
    lines.push(DIVIDER);
    lines.push(notes);
  }

  lines.push("");
  lines.push("====================");
  lines.push("Obrigado pela preferência!");
  lines.push("====================");

  return lines.join("\n");
}

export function buildWhatsappLink(message: string) {
  // telefone whatsapp
  const phone = 5592988525784;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
