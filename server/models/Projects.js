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
        type: String,
        required: true
    },
    endDate: {
        type: String
    }
})

module.exports = mongoose.model('Projects', ProjectSchema);