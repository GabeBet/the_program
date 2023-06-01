const express = require('express');
const router = express.Router();
const Customer = require('../models/Customers');

//Get back all customer
router.get('/', async (req,res) => {
    try{
        const customer = await Customer.find();
        res.json(customer)
    }catch(err){
        res.json({message: err});
    }
});

//Submits customer
router.post('/', async (req,res) => {
    const customer = new Customer({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    });

    try {
        const savedCustomer = await customer.save();
        res.json(savedCustomer)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific customer
router.get('/:customerId', async (req,res) => {
    try{
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    }catch(err){
        res.json({message: err});
    }
})

//Delete customer
router.delete('/:customerId', async (req,res) => {
    try{
        const removedCustomer = await Customer.findByIdAndDelete({_id: req.params.customerId});
        res.json(removedCustomer);
    }catch(err){
        res.json({message: err});
    }
})

//Update customer
router.put('/:customerId', async (req,res) => {
    try{
        const updatedCustomer = await Customer.updateOne(
            {_id: req.params.customerId}, 
            { $set: { name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email
            }}
        );
        res.json(updatedCustomer);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;