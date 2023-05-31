const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')

//Middlewares
app.use(cors({
    credentials: true,
    origin:true,
}));
app.use(bodyParser.json());

//Import Routes
const projectRoutes = require('./routes/projects');
const customerRoutes = require('./routes/customers');
const sqFtRoutes = require('./routes/squarefootage');
const estimateRoutes = require('./routes/estimate');
const invoiceRoutes = require('./routes/invoice');
const bankStatementRoutes = require('./routes/bankstatement');

app.use('/projects',projectRoutes);
app.use('/customers',customerRoutes);
app.use('/squarefootage',sqFtRoutes);
app.use('/estimate',estimateRoutes);
app.use('/invoice',invoiceRoutes);
app.use('/bankstatement',bankStatementRoutes);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true}
);

app.listen(4000);