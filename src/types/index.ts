export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  featured?: boolean;
  discount?: number;
  stockQuantity: number;
}

export type ProductCategory = 
  | 'food' 
  | 'toys' 
  | 'hygiene' 
  | 'accessories' 
  | 'medication'
  | 'bedding';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
}

export interface Appointment {
  id?: string;
  customerName: string;
  customerPhone: string;
  petName: string;
  petType: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  comment: string;
  rating: number;
  petName?: string;
  imageUrl?: string;
}