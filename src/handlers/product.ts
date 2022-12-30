// deno-lint-ignore-file
import { Context, helpers } from '../deps.ts';
import type { Product, ProductDto } from '../types/product.ts';
import * as db from '../db/product.ts';

export const findAll = (ctx: Context) => {
  try {
    const products: Product[] = db.findAll();
    ctx.response.body = products;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findProduct = (ctx: Context) => {
  try {
    const { prodId } = helpers.getQuery(ctx, { mergeParams: true });
    const prod: Product = db.findProductById(prodId);
    ctx.response.body = prod;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    const { title, price, img } = await ctx.request.body().value;
    const newProd: Product = db.createProduct({
      title,
      price,
      img,
    });
    ctx.response.body = {
      status: 'success',
      msg: 'Product created!',
      data: newProd,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const updateProduct = async (ctx: Context) => {
  try {
    const { prodId } = helpers.getQuery(ctx, { mergeParams: true });
    const body: ProductDto = await ctx.request.body().value;
    const updatedProd: Product = db.updateProduct(prodId, body);
    ctx.response.body = {
      status: 'success',
      msg: 'Product updated!',
      data: updatedProd,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteProduct = (ctx: Context) => {
  try {
    const { prodId } = helpers.getQuery(ctx, { mergeParams: true });
    db.deleteProduct(prodId);
    ctx.response.body = {
      status: 'success',
      msg: 'Product deleted!',
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
