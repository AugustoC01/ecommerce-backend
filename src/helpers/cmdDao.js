const {
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require('../services/productService');
const yargs = require('yargs/yargs')(process.argv.slice(2));
const args = yargs.default({
  cmd: 'default',
  id: '',
  title: 'TV',
  price: 123,
  thumb: 'url',
  desc: 'description',
  code: 'code',
  stock: 10,
}).argv;

const ejecutarCmd = async () => {
  try {
    const { cmd, id, title, price, thumb, desc, code, stock } = args;
    console.log(cmd);
    switch (cmd.toLowerCase()) {
      case 'buscar':
        console.log(await getProduct(id));
        break;
      case 'editar':
        console.log(
          await updateProduct(id, {
            title,
            price,
            thumbnail: thumb,
            description: desc,
            code,
            stock,
          })
        );
        break;
      case 'agregar':
        const id = await createProduct(id, {
          title,
          price,
          thumbnail: thumb,
          description: desc,
          code,
          stock,
        });
        console.log(id);
        break;
      case 'borrar':
        console.log(await deleteProduct(id));
        break;
      default:
        console.log(
          'Selecciona una operacion: Buscar, Editar, Agregar, Borrar'
        );
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = ejecutarCmd;
