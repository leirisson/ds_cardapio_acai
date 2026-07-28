export type Category = "Copos" | "Barcas" | "Potes" | "Roletas";

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoMix?: number;
  imagem: string;
  categoria: Category;
};

export type ProductSelection = {
  sabor: string;
  acompanhamentos: string[];
  calda: string;
  frutas: string[];
};

export type CartItem = {
  cartItemId: string;
  product: Product;
  quantity: number;
  selection: ProductSelection;
};

export type PaymentMethod = "dinheiro" | "cartao" | "pix";

export type DeliveryMethod = "delivery" | "retirada";

export type DeliveryAddress = {
  rua: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
};

export type Customer = {
  nome: string;
  whatsapp: string;
  email: string;
  endereco: DeliveryAddress;
};

export type Order = {
  items: CartItem[];
  customer: Customer;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  changeFor?: number;
  notes?: string;
};
