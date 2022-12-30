export interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
}

export interface ProductForUpdate {
  title?: string;
  price?: number;
  img?: string;
}

export interface ProductForCreation {
  title: string;
  price: number;
  img: string;
}

export interface ProductDto {
  title: string;
  price: number;
  img: string;
}
