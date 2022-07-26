'use strict'

const productController = require('../controllers/product.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/createProduct', [mdAuth.ensureAuth, mdAuth.isAdmin], productController.createProduct);
api.get('/getProducts', productController.getProducts);
api.get('/getProduct/:id', productController.getProduct);


module.exports = api;