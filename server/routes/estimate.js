const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

//Get back all estimates
router.get('/', async (req,res) => {
    try{
        const estimate = await Estimate.find();
        res.json(estimate)
    }catch(err){
        res.json({message: err});
    }
});

//Submits estimates
router.post('/', async (req,res) => {
    const estimate = new Estimate({
        projectNumber: req.body.projectNumber,
        address: req.body.address,
        date: req.body.date,
        inputFields: req.body.inputFields,
        subTotal: req.body.subTotal,
        tax: req.body.tax,
        total: req.body.total,
        deposit: req.body.deposit,
        balance: req.body.balance
    });

    try {
        const savedEstimate = await estimate.save();
        res.json(savedEstimate)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific estimate
router.get('/:estimateId', async (req,res) => {
    try{
        const estimate = await Estimate.findById(req.params.estimateId);
        res.json(estimate);
    }catch(err){
        res.json({message: err});
    }
})

//Delete estimate
router.delete('/:estimateId', async (req,res) => {
    try{
        const removedEstimate = await Estimate.findByIdAndDelete({_id: req.params.estimateId});
        res.json(removedEstimate);
    }catch(err){
        res.json({message: err});
    }
})

//Update estimate
router.put('/:estimateId', async (req,res) => {
    try{
        const updatedEstimate = await Estimate.updateOne(
            {_id: req.params.estimateId}, 
            { $set: { projectNumber: req.body.projectNumber,
                address: req.body.address,
                date: req.body.date,
                inputFields: req.body.inputFields,
                subTotal: req.body.subTotal,
                tax: req.body.tax,
                total: req.body.total,
                deposit: req.body.deposit,
                balance: req.body.balance 
            }}
        );
        res.json(updatedEstimate);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;