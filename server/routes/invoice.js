const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

//Get back all invoices
router.get('/', async (req,res) => {
    try{
        const invoice = await Invoice.find();
        res.json(invoice)
    }catch(err){
        res.json({message: err});
    }
});

//Submits invoices
router.post('/', async (req,res) => {
    const invoice = new Invoice({
        projectNumber: req.body.projectNumber,
        invoiceNumber: req.body.invoiceNumber,
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
        const savedInvoice = await invoice.save();
        res.json(savedInvoice)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific invoice
router.get('/:invoiceId', async (req,res) => {
    try{
        const invoice = await Invoice.findById(req.params.invoiceId);
        res.json(invoice);
    }catch(err){
        res.json({message: err});
    }
})

//Delete invoice
router.delete('/:invoiceId', async (req,res) => {
    try{
        const removedInvoice = await Invoice.findByIdAndDelete({_id: req.params.invoiceId});
        res.json(removedInvoice);
    }catch(err){
        res.json({message: err});
    }
})

//Update invoice
router.put('/:invoiceId', async (req,res) => {
    try{
        const updatedInvoice = await Invoice.updateOne(
            {_id: req.params.invoiceId}, 
            { $set: { projectNumber: req.body.projectNumber,
                invoiceNumber: req.body.invoiceNumber,
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
        res.json(updatedInvoice);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;