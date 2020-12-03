const Expense = require('../entity/expense.entity');

exports.create = async (req, res, next) =>{
    const {amount, description, created} = req.body;
    const newExpense = new Expense({
       amount, description, created, owner: req.userData.id
    });
    try {
        const saved = await newExpense.save();
        return res.status(201).json({
           success: true,
           expense: saved
        });
    } catch (e) {
        next(e);
    }
}

exports.findAll = async (req, res, next) =>{
    const {userData} = req;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const query = {
        owner: userData.id,
        created: {
            $gte: firstDay,
            $lt: lastDay
        }
    }
    try {
        const expenses = await Expense.find(query);
        return res.status(200).json({
            expenses: expenses
        });
    } catch (e) {
        next(e);
    }
}

exports.removeById = async (req, res, next) =>{
    const id = req.params.expenseId;
    try {
        await Expense.deleteOne({_id: id});
        return res.status(200).json({
            message: 'expense deleted successfully!'
        });
    } catch (e) {
        next(e);
    }
}

exports.update = async (req, res, next) =>{
    const id = req.params.expenseId;
    try {
        const expense = await Expense.update({_id: id}, {$set: {
                amount: req.body.amount, description: req.body.description, created: req.body.created
            }});
        return res.status(200).json({
            success: true,
            expense: expense
        });
    } catch (e) {
        next(e);
    }
}