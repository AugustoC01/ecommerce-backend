const socket = io();

socket.on('chatData', (data) => {
  const chatData = data.reduce(
    (chatMsgs, newMsg) =>
      chatMsgs +
      `
    <tr>
    <td> <p class='user'>${newMsg.user}</p> </td>
    <td> <p class='date'>[${newMsg.timestamp}] :</p> </td>
    <td> <p class='msg'>${newMsg.msg}<p/> </td>
    </tr>`,
    ''
  );
  document.getElementById('msg-list').innerHTML = chatData;
});

socket.on('productsData', (data) => {
  const prodData = data.reduce(
    (products, newProd) =>
      products +
      `
    <div class='prod-container'>
    <p>${newProd.id}</p>
    <p>${newProd.title}</p>
    <p>$${newProd.price}</p>
    <img src='${newProd.thumbnail}' class='product-img'/>
    </div>`,
    ''
  );
  document.getElementById('products-list').innerHTML = prodData;
});

function sendMsg(chatData) {
  let messageToAdd = {
    author: {
      email: chatData.user.value,
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 'edad del usuario',
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario',
    },
    text: chatData.msg.value,
  };

  socket.emit('chatMsg', messageToAdd);
}

/* function sendProd(prodData) {
  let prodToAdd = {
    title: prodData.title.value,
    price: prodData.price.value,
    thumbnail: prodData.thumbnail.value,
  };
  socket.emit('addProd', prodToAdd);
} */
