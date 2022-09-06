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
    <p>${newProd.timestamp}</p>
    <p>${newProd.description}</p>
    <p>${newProd.code}</p>
    <p>${newProd.stock}</p> 
    </div>`,
    ''
  );
  document.getElementById('products-list').innerHTML = prodData;
});

function sendMsg(chatData) {
  let messageToAdd = {
    user: chatData.user.value,
    msg: chatData.msg.value,
  };
  socket.emit('chatMsg', messageToAdd);
}

function sendProd(prodData) {
  let prodToAdd = {
    title: prodData.title.value,
    description: prodData.description.value,
    code: prodData.code.value,
    thumbnail: prodData.thumbnail.value,
    price: prodData.price.value,
    stock: prodData.stock.value,
  };
  socket.emit('addProd', prodToAdd);
}
