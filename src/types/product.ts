export interface Product {
  id: string;
  name: string;
  variety: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  category: 'fresh' | 'pulp' | 'processed';
  inStock: boolean;
  origin: string;
  weight: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}