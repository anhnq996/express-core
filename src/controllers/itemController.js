const itemService = require('../services/itemService');
const ItemResource = require('../resources/itemResource');
const { formatResponse, SuccessCodes, ErrorCodes, ErrorStatus } = require('../utils/response');

class ItemController {
  async getAllItems(req, res) {
    try {
      const items = await itemService.getAllItems();
      res.json(formatResponse(true, SuccessCodes.S1000, res.__('Items retrieved successfully'), ItemResource.collection(items)));
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorStatus.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }

  async createItem(req, res) {
    try {
      const item = await itemService.createItem(req.body);
      res.status(SuccessCodes.CREATED).json(formatResponse(true, SuccessCodes.S1000, res.__('item_created'), ItemResource.format(item)));
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorStatus.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }

  async updateItem(req, res) {
    try {
      const item = await itemService.updateItem(req.params.id, req.body);
      if (item) {
        res.json(formatResponse(true, SuccessCodes.OK, res.__('item_updated'), ItemResource.format(item)));
      } else {
        res.status(ErrorCodes.NOT_FOUND).json(formatResponse(false, ErrorCodes.E5000, res.__('item_not_found')));
      }
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorCodes.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await itemService.deleteItem(req.params.id);
      if (item) {
        res.json(formatResponse(true, SuccessCodes.OK, res.__('item_deleted'), ItemResource.format(item)));
      } else {
        res.status(ErrorStatus.NOT_FOUND).json(formatResponse(false, ErrorCodes.E5000, res.__('item_not_found')));
      }
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorCodes.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }
}

module.exports = new ItemController();
