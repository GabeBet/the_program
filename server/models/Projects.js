const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    }
})

module.exports = mongoose.model('Projects', ProjectSchema);