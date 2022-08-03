const fs = require('fs');

class Contenedor {
  constructor(archive) {
    this.fileName = `./${archive}.json`;
  }

  async readArch() {
    try {
      return await fs.promises.readFile(this.fileName, 'utf-8');
    } catch (error) {
      if (error.code == 'ENOENT') {
        await fs.promises.writeFile(this.fileName, '[]', (error) => {
          if (error) {
            console.log('El archivo no pudo ser creado');
          }
        });
        return await fs.promises.readFile(this.fileName, 'utf-8');
      }
    }
  }

  async getAll() {
    const fileData = await this.readArch();
    return JSON.parse(fileData);
  }

  async save(object) {
    try {
      let fileData = await this.getAll();
      const index = fileData.length + 1;
      object.id = index;

      if (!object.id) {
        object.id = 1;
        const data = [{ ...object }];
        await fs.promises.writeFile(this.fileName, JSON.stringify(data));
        return arreglo[0].id;
      }

      fileData.push(object);
      await fs.promises.writeFile(this.fileName, JSON.stringify(fileData));

      return index;
    } catch (error) {
      console.log(error);
    }
  }

  async searchById(prodId) {
    let fileData = await this.getAll();
    let i = 0;
    let objectFound = false;
    while (!objectFound) {
      fileData[i].id === prodId ? (objectFound = !objectFound) : i++;
    }
    return objectFound ? i : null;
  }

  async getById(prodId) {
    let fileData = await this.getAll();
    const index = await this.searchById(prodId);
    return index !== null ? fileData[index] : null;
  }

  async deleteById(prodId) {
    let fileData = await this.getAll();
    const index = await this.searchById(prodId);
    if (index !== null) {
      fileData.splice(index, 1);
      await fs.promises.writeFile(this.fileName, JSON.stringify(fileData));
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.fileName, '[]');
  }
}

/* const initialObject = {
  title: 'Nuevo Art',
  price: 3000,
  thumbnail: 'url_img',
};
const texto = new Contenedor('productos');

async function main() {
  const a = await texto.getAll();
  console.log(a);
  const b = await texto.save(initialObject);
  console.log(b);
  const c = await texto.getById(2);
  console.log(c);
  const d = await texto.deleteById();
  const e = await texto.deleteAll();
}

main(); */

module.exports = Contenedor;
