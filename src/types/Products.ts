export interface Category {
  id: number;
  name: string;
  image: string;

}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: Array<string>;

  category:Category
}

export interface Filter {
  categoryId: string;
  price_min: string;
  price_max: string;
  title: string;
}

export interface Cart extends Product {
    quantity: number;
}



export interface NewProduct {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
}