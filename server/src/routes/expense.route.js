const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const expenseController = require('../controller/expense.controller');

router.post('/', checkAuth, expenseController.create);
router.get('/:month?', checkAuth, expenseController.findAll);
router.get('/:expenseId', checkAuth, expenseController.retrieveOneExpense);
router.delete('/:expenseId', checkAuth, expenseController.removeById);
router.put('/:expenseId', checkAuth, expenseController.update);
module.exports = router;