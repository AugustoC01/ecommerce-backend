var io = io();

//VARIABLES PARA GUARDAR EMISOR Y REMITENTE
var sender = '';
var receiver = '';

io.on('user-connected', ({ user, username, messages }) => {
  console.log(messages);
  let users = '';
  users +=
    '<li><button onclick=onUserSelected(this.innerHTML)>' +
    username +
    '</button></li>';
  document.getElementById('usersList').innerHTML += users;
});

io.on('new-msg', (data) => {
  // console.log(data);
  //MUESTRO EL MENSAJE A QUIEN LE CORRESPONDE
  let messages = '';
  messages += '<li>' + data.sender + ' dice: ' + data.message + '</li>';
  document.getElementById('messages').innerHTML += messages;
});

function enterName() {
  const name = document.getElementById('name').value;
  if (name == '') return false;
  io.emit('user-connected', name);
  //ASIGNO QUIEN ENVIA EL MENSAJE
  sender = name;
  return false;
}

function onUserSelected(username) {
  //ASIGNO QUIEN RECIBE EL MENSAJE
  receiver = username;
  // console.log(username);
}

function sendMsg() {
  const message = document.getElementById('message').value;
  // VERIFICO QUE EL MENSAJE NO ESTE VACIO Y QUE HAYA DESTINO
  if (message == '') return false;
  if (receiver == '') return false;
  //ENVIO MENSAJE A SERVER
  io.emit('send-msg', {
    sender,
    receiver,
    message,
  });
  // MUESTRO EL MENSAJE QUE MANDE
  let messages = '';
  messages += '<li>Vos: ' + message + '</li>';
  document.getElementById('messages').innerHTML += messages;

  return false;
}
