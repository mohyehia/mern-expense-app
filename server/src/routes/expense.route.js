const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const expenseController = require('../controller/expense.controller');

router.post('/', checkAuth, expenseController.create);
router.get('/', checkAuth, expenseController.findAll);
router.delete('/:expenseId', checkAuth, expenseController.removeById);
router.put('/:expenseId', checkAuth, expenseController.update);
module.exports = router;