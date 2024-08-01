const Item = require('../models/item');

class ItemService {
  async getAllItems() {
    return await Item.find();
  }

  async createItem(data) {
    const item = new Item(data);
    return await item.save();
  }

  async updateItem(id, data) {
    return await Item.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteItem(id) {
    return await Item.findByIdAndDelete(id);
  }
}

module.exports = new ItemService();