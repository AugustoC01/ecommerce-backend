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
      const fileData = await this.getAll();
      fileData.push(object);
      await fs.promises.writeFile(this.fileName, JSON.stringify(fileData));
    } catch (error) {
      console.log(error);
    }
  }

  async getNewId() {
    const fileData = await this.getAll();
    let max = 0;
    fileData.forEach((prod) => {
      if (prod.id >= max) {
        max = prod.id;
      }
    });
    return max + 1;
  }

  async searchById(prodId) {
    const fileData = await this.getAll();
    let i = 0;
    let objectFound = false;
    while (!objectFound) {
      fileData[i].id == prodId ? (objectFound = !objectFound) : i++;
    }
    return objectFound ? i : null;
  }

  async update(object) {
    const fileData = await this.getAll();
    const index = await this.searchById(object.id);
    fileData[index] = object;
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(fileData));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(prodId) {
    const fileData = await this.getAll();
    const index = await this.searchById(prodId);
    return index !== null ? fileData[index] : null;
  }

  async deleteById(prodId) {
    const fileData = await this.getAll();
    const index = await this.searchById(prodId);
    if (index !== null) {
      fileData.splice(index, 1);
      try {
        await fs.promises.writeFile(this.fileName, JSON.stringify(fileData));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.fileName, '[]');
  }
}

module.exports = Contenedor;
