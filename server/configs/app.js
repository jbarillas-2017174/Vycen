'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('../src/routes/user.routes');
const companyRoutes = require('../src/routes/company.routes');
const productRoutes = require('../src/routes/product.routes');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/product', productRoutes);



module.exports = app;