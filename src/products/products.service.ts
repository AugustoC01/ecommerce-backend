import { Injectable } from '@nestjs/common';
import { Product } from 'src/interfaces/product/product.interface';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  create(prod: CreateProductDto) {
    const id = randomBytes(10).toString('hex');
    this.products.push({ id, ...prod });
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    return this.products.find((prod) => prod.id == id);
  }

  update(id: string, body: CreateProductDto) {
    const prod = this.findOne(id);
    const updatedProd = Object.assign(prod, body);
    const i = this.products.findIndex((prod) => prod.id == id);
    this.products.splice(i, 1, updatedProd);
  }

  delete(id: string) {
    const i = this.products.findIndex((prod) => prod.id == id);
    this.products.splice(i, 1);
  }
}
