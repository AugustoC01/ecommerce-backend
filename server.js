import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import crypto from 'crypto';
import cors from 'cors';

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    img: String,
    price: Int
  }
  input ProductInput {
    title: String,
    img: String,
    price: Int
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts(campo: String, valor: String): [Product],
  }
  type Mutation {
    createProduct(data: ProductInput): Product
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);

class Product {
  constructor(id, { title, img, price }) {
    this.id = id;
    this.title = title;
    this.img = img;
    this.price = price;
  }
}

let productsMap = {};

function getProducts({ campo, valor }) {
  const products = Object.values(productsMap);
  if (campo && valor) {
    return products.filter((prod) => prod[campo] == valor);
  } else {
    return products;
  }
}

function getProduct({ id }) {
  if (!productsMap[id]) {
    throw new Error('Product not found.');
  }
  return productsMap[id];
}

function createProduct({ data }) {
  const id = crypto.randomBytes(10).toString('hex');
  const newProd = new Product(id, data);
  productsMap[id] = newProd;
  return newProd;
}

function updateProduct({ id, data }) {
  if (!productsMap[id]) {
    throw new Error('Product not found');
  }
  Object.assign(productsMap[id], data);
  return productsMap[id];
}

function deleteProduct({ id }) {
  if (!productsMap[id]) {
    throw new Error('Product not found');
  }
  const deletedProd = productsMap[id];
  delete productsMap[id];
  return deletedProd;
}

const app = express();

app.use(cors());
app.use(express.static('public'));

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProducts,
      getProduct,
      createProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}/`);
});

//MOCK
// import prods from './mock.js';
// productsMap = prods;
