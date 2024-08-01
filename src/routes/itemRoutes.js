const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const createItemRequest = require('../requests/createItemRequest');
const validateItem = require('../middleware/validateItem');

router.get('/', itemController.getAllItems);
router.post('/', createItemRequest, itemController.createItem);
router.put('/:id', validateItem, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;