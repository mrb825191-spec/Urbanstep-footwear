export type FootwearCategory = 
  | 'All'
  | 'Men'
  | 'Women'
  | 'Kids'
  | 'Sports'
  | 'Casual'
  | 'Formal'
  | 'Sandals'
  | 'Slippers';

export type FootwearGender = 'Men' | 'Women' | 'Kids' | 'Unisex';

export interface Product {
  id: number;
  name: string;
  category: 'Formal' | 'Casual' | 'Sports' | 'Sandals' | 'Slippers';
  gender: FootwearGender;
  price: number;
  mrp?: number;
  image: string;
  desc: string;
  features?: string[];
  sizes: number[];
  color: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface StoreConfig {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  accentColor: string;
}

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productPurchased: string;
}
