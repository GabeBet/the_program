const express = require('express');
const router = express.Router();
const BankStatement = require('../models/BankStatement');

//Get back all bank statements
router.get('/', async (req,res) => {
    try{
        const bankStatement = await BankStatement.find();
        res.json(bankStatement)
    }catch(err){
        res.json({message: err});
    }
});

//Submits bank statements
router.post('/', async (req,res) => {
    const bankStatement = new BankStatement({
        description: req.body.description,
        amount: req.body.amount,
        debitCredit: req.body.debitCredit,
        category: req.body.category,
        projectNumber: req.body.projectNumber
    });

    try {
        const savedBankStatement = await bankStatement.save();
        res.json(savedBankStatement)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific bank statement
router.get('/:bankstatementID', async (req,res) => {
    try{
        const bankStatement = await BankStatement.findById(req.params.bankstatementID);
        res.json(bankStatement);
    }catch(err){
        res.json({message: err});
    }
})

//Delete bankStatement
router.delete('/:bankstatementID', async (req,res) => {
    try{
        const removedBankStatement = await BankStatement.findByIdAndDelete({_id: req.params.bankstatementID});
        res.json(removedBankStatement);
    }catch(err){
        res.json({message: err});
    }
})

//Update bankStatement
router.put('/:bankstatementID', async (req,res) => {
    try{
        const updatedBankStatement = await BankStatement.updateOne(
            {_id: req.params.bankstatementID}, 
            { $set: { description: req.body.description,
                amount: req.body.amount,
                debitCredit: req.body.debitCredit,
                category: req.body.category,
                projectNumber: req.body.projectNumber
            }}
        );
        res.json(updatedBankStatement);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;