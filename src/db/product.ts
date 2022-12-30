// deno-lint-ignore-file
import type { Product, ProductDto } from '../types/product.ts';
import { v1 } from '../deps.ts';

let products: Product[] = [];

export function findAll(): Product[] {
  return products;
}

export function findProductById(id: string): Product {
  const prod = products.find((prod) => prod.id == id);
  if (!prod) {
    throw new Error('Product not found');
  } else {
    return prod;
  }
}

export function createProduct(prod: ProductDto): Product {
  if (!prod) {
    throw new Error('cant create the user');
  } else {
    const newProd = { id: v1.generate().toString(), ...prod };
    products.push(newProd);
    return newProd;
  }
}

export function updateProduct(id: string, body: ProductDto): Product {
  const prod = products.find((prod) => prod.id == id);
  if (!prod) {
    throw new Error('Product not found');
  } else {
    const updatedProd: Product = { ...prod, ...body };
    const i = products.findIndex((prod) => prod.id == id);
    products.splice(i, 1, updatedProd);
    return updatedProd;
  }
}

export function deleteProduct(id: string) {
  const prod = products.find((prod) => prod.id == id);
  if (!prod) {
    throw new Error('Product not found');
  } else {
    products = products.filter((prod) => prod.id !== id);
  }
}
