const mongoose = require('mongoose');

const BankStatementSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    debitCredit: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    projectNumber: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BankStatement', BankStatementSchema);