process.on('message', (cant) => {
  let objNum = randomObject(cant);
  process.send({ type: 'random', data: objNum });
});

// CREA EL OBJETO CON NUMEROS RANDOM
const randomObject = (cant) => {
  let obj = {};
  for (let i = 0; i < cant; i++) {
    let num = Math.trunc(Math.random() * (1000 - 1) + 1);
    numInObject(num, obj) ? (obj[num] = obj[num] + 1) : (obj[num] = 1);
  }
  return obj;
};

// REVISA SI EL NUMERO YA SALIO Y AUMENTA EL CONTADOR DE CADA NUMERO
const numInObject = (num, objNum) => {
  const keys = Object.keys(objNum);
  return keys.includes(JSON.stringify(num));
};
