import { Router } from '../deps.ts';
import {
  findAll,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../handlers/product.ts';
export const router = new Router()
  .get('', findAll)
  .get('/:prodId', findProduct)
  .post('', createProduct)
  .put('/:prodId', updateProduct)
  .delete('/:prodId', deleteProduct);
