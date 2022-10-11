const { faker } = require('@faker-js/faker');

const createFakeProducts = (n = 5) => {
  let products = [];
  for (let i = 0; i < n; i++) {
    products.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(1000, 5000, 0, '$'),
      thumbnail: faker.image.cats(640, 480, true),
    });
  }
  return products;
};

module.exports = createFakeProducts;
