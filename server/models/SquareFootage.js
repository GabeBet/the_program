const mongoose = require('mongoose');

const SquareFootSchema = mongoose.Schema({
    projectNumber: {
        type: String,
        required: true
    },
    inputFields: {
        type: Object,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('SquareFootage', SquareFootSchema);