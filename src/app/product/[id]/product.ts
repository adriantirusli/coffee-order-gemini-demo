export interface Modifier {
  id: number;
  name: string;
  price: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  modifiers: {
    size: Modifier[];
    extras: Modifier[];
    temperature: Modifier[];
  };
}
