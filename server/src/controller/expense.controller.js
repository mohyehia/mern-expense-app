const Expense = require('../entity/expense.entity');

exports.create = async (req, res, next) =>{
    const {amount, description, created} = req.body;
    const expense = new Expense({
       amount, description, created, owner: req.userData.id
    });
    await expense.save()
        .then(exp =>{
            res.status(201).json({
                message: 'Expense created successfully!',
                createdExpense: {
                    id: exp._id,
                    amount: exp.amount,
                    description: exp.description,
                    created: exp.created,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/expenses/' + exp._id
                    }
                }
            });
        })
        .catch(e =>{
            console.log(e);
            res.status(500).json({error: e});
        });
}

exports.findAll = async (req, res, next) =>{
    const {userData} = req;
    const now = new Date();
    const month = parseInt(req.params.month);
    if(month && month >= 0 && month <= 11){
        now.setMonth(month);
    }
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const query = {
        owner: userData.id,
        created: {
            $gte: firstDay,
            $lt: lastDay
        }
    };
    await Expense.find(query)
        .sort({created: 'desc'})
        .select('_id amount description created')
        .then(expenses =>{
            res.status(200).json({
               count: expenses.length,
               expenses: expenses.map(expense =>{
                   return {
                       id: expense._id,
                       amount: expense.amount,
                       description: expense.description,
                       created: expense.created,
                       request: {
                           type: 'GET',
                           url: 'http://localhost:5000/expenses/' + expense._id
                       }
                   }
               })
            });
        })
        .catch(e =>{
            console.log(e);
            res.status(500).json({error: err});
        });
}

exports.retrieveOneExpense = async (req, res, next) =>{
    const id = req.params.expenseId;
    await Expense.findById(id)
        .select('_id amount description created')
        .then(exp =>{
            if(exp){
                res.status(200).json({
                    Expense: exp,
                    request: {
                        type: 'GET',
                        description: 'Get all expenses',
                        url: 'http://localhost:5000/expenses'
                    }
                });
            }else{
                res.status(404).json({message: 'Not Found!'});
            }
        })
        .catch(err =>{
            console.error(err);
            res.status(500).json({error: err});
        })
}

exports.removeById = async (req, res, next) =>{
    const id = req.params.expenseId;
    try {
        const check = await Expense.findOne({_id: id});
        if(!check.owner.equals(req.userData.id)){
            const err = new Error('This expense object does not belong to u!');
            err.status = 401;
            throw err;
        }
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
        const check = await Expense.findOne({_id: id});
        if(!check.owner.equals(req.userData.id)){
            const err = new Error('This expense object does not belong to u!');
            err.status = 401;
            throw err;
        }
        await Expense.update({_id: id}, {$set: {
                amount: req.body.amount, description: req.body.description, created: req.body.created
            }});
        return res.status(200).json({
            message: 'Expense updated successfully!',
            request: {
                type: 'GET',
                url: 'http://localhost:5000/expenses/' + id
            }
        });
    } catch (e) {
        next(e);
    }
}