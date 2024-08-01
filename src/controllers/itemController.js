const itemService = require('../services/itemService');

class ItemController {
  async getAllItems(req, res) {
    const items = await itemService.getAllItems();
    res.json(items);
  }

  async createItem(req, res) {
    const item = await itemService.createItem(req.body);
    res.status(201).json({ message: res.__('item_created'), item });
  }

  async updateItem(req, res) {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: res.__('item_not_found') });
    }
  }

  async deleteItem(req, res) {
    const item = await itemService.deleteItem(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: res.__('item_not_found') });
    }
  }
}

module.exports = new ItemController();
