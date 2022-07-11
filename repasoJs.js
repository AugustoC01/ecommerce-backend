class Usuario {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.books = [];
    this.pets = [];
  }

  getFullname() {
    return `${this.name} ${this.surname}`;
  }

  addMascota(newPet) {
    this.pets.push(newPet);
  }

  countMascotas() {
    return this.pets.length;
  }

  addBook(bookTitle, bookAuthor) {
    const newBook = { title: bookTitle, author: bookAuthor };
    this.books.push(newBook);
  }

  getBookNames() {
    const bookNames = [];
    this.books.forEach((book) => bookNames.push(book.title));
    return bookNames;
  }
}

const user = new Usuario('Elon', 'Musk');

user.addMascota('perro');
user.addMascota('gato');

console.log(user.countMascotas());

user.addBook('El señor de las moscas', 'William Golding');
user.addBook('Fundacion', 'Isaac Asimov');

console.log(user.getBookNames());

console.log(user.getFullname());
