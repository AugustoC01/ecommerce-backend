const { fork } = require('child_process');
const join = require('path').join;

const randomNumbers = (req, res) => {
  let cant;
  req.query.cant ? (cant = req.query.cant) : (cant = 1000000);

  let task = fork(join(__dirname, '../helpers/randomObject/randomObject.js'));
  task.send(cant);

  task.on('message', (msg) => {
    const { data, type } = msg;
    if (type === 'random') {
      res.json(data);
    } else {
      res.json('error');
    }
  });
};

module.exports = { randomNumbers };
