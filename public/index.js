const socket = io();

socket.on('chatData', (data) => {
  const chatData = data.reduce(
    (chatMsgs, newMsg) =>
      chatMsgs +
      `
    <tr>
    <td> <p class='mail'>${newMsg.mail}</p> </td>
    <td> <p class='date'>[${newMsg.date}] :</p> </td>
    <td> <p class='msg'>${newMsg.msg}<p/> </td>
    </tr>`,
    ''
  );
  document.getElementById('msg-list').innerHTML = chatData;
});

socket.on('productsData', (data) => {
  let prodMap = data.map((prod) => {
    return `
    <tr>
    <td> <p>${prod.title}</p> </td>
    <td> <p>${prod.price}</p> </td>
    <td> <img src='${prod.thumbnail}' class='product-img'/> </td>
    </tr>
    `;
  });

  document.getElementById('products-list').innerHTML = prodMap;
});

function sendMsg(chatData) {
  let messageToAdd = {
    mail: chatData.mail.value,
    msg: chatData.msg.value,
    date: new Date().toDateString(),
  };
  socket.emit('chatMsg', messageToAdd);
}

function sendProd(prodData) {
  let prodToAdd = {
    title: prodData.title.value,
    price: prodData.price.value,
    thumbnail: prodData.thumbnail.value,
  };
  socket.emit('addProd', prodToAdd);
}
