'use strict'

const companyController = require('../controllers/company.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/createCompany', companyController.createCompany);
api.get('/getCompanies', companyController.getCompanies);
api.get('/getCompany/:id', companyController.getCompany);

module.exports = api;