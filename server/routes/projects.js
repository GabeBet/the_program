const express = require('express');
const router = express.Router();
const Project = require('../models/Projects');

//Get back all projects
router.get('/', async (req,res) => {
    try{
        const project = await Project.find();
        res.json(project)
    }catch(err){
        res.json({message: err});
    }
});

//Submits projects
router.post('/', async (req,res) => {
    const project = new Project({
        projectNumber: req.body.projectNumber,
        description: req.body.description,
        customerName: req.body.customerName,
        invoiceNumber: req.body.invoiceNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    try {
        const savedProject = await project.save();
        res.json(savedProject)
    }catch(err){
        res.json({message: err});
    }
})

//Get back specific project
router.get('/:projectId', async (req,res) => {
    try{
        const project = await Project.findById(req.params.projectId);
        res.json(project);
    }catch(err){
        res.json({message: err});
    }
})

//Delete project
router.delete('/:projectId', async (req,res) => {
    try{
        const removedProject = await Project.findByIdAndDelete({_id: req.params.projectId});
        res.json(removedProject);
    }catch(err){
        res.json({message: err});
    }
})

//Update project
router.put('/:projectId', async (req,res) => {
    try{
        const updatedProject = await Project.updateOne(
            {_id: req.params.projectId}, 
            { $set: { projectNumber: req.body.projectNumber, 
                description: req.body.description,
                customerName: req.body.customerName,
                invoiceNumber: req.body.invoiceNumber,
                startDate: req.body.startDate,
                endDate: req.body.endDate 
            }}
        );
        res.json(updatedProject);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;