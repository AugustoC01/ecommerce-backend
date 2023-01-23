const Orders = require("../models/orderSchema");
const { errorLogger } = require("../helpers/logger");

let instance = null;
class OrdersDao {
  static getInstance() {
    if (!instance) instance = new OrdersDao();
    return instance;
  }

  async newOrder(order) {
    try {
      order.timestamp = new Date().toLocaleString();
      order.orderNum = (await this.getMax()) + 1;
      return await Orders.create(order);
    } catch (e) {
      errorLogger(e);
    }
  }

  async getMax() {
    try {
      const order = await Orders.findOne().sort("-orderNum");
      if (!order) return 0;
      return order.orderNum;
    } catch (e) {
      errorLogger(e);
    }
  }
}

module.exports = OrdersDao;
