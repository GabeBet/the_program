const express = require('express');
const router = express.Router();
const SquareFootage = require('../models/SquareFootage');

//Get back all sqft
router.get('/', async (req,res) => {
    try{
        const sqft = await SquareFootage.find();
        res.json(sqft)
    }catch(err){
        res.json({message: err});
    }
});

//Submits sqft
router.post('/', async (req,res) => {
    const sqft = new SquareFootage({
        projectNumber: req.body.projectNumber,
        inputFields: req.body.inputFields,
        grandTotal: req.body.grandTotal
    });

    try {
        const savedSqFt = await sqft.save();
        res.json(savedSqFt)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific sqft
router.get('/:sqFtId', async (req,res) => {
    try{
        const sqft = await SquareFootage.findById(req.params.sqFtId);
        res.json(sqft);
    }catch(err){
        res.json({message: err});
    }
})

//Delete sqft
router.delete('/:sqFtId', async (req,res) => {
    try{
        const removedSqFt = await SquareFootage.findByIdAndDelete({_id: req.params.sqFtId});
        res.json(removedSqFt);
    }catch(err){
        res.json({message: err});
    }
})

//Update sqft
router.put('/:sqFtId', async (req,res) => {
    try{
        const updatedSqFt = await SquareFootage.updateOne(
            {_id: req.params.sqFtId}, 
            { $set: { projectNumber: req.body.projectNumber,
                inputFields: req.body.inputFields,
                grandTotal: req.body.grandTotal
            }}
        );
        res.json(updatedSqFt);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;