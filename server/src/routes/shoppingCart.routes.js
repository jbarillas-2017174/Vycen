'use strict'

const cartController = require('../controllers/shoppingCart.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

api.post('/addProduct/:product', mdAuth.ensureAuth, cartController.addToCart);
api.post('/quitProduct/:product', mdAuth.ensureAuth, cartController.quitToCart);
api.get('/getCart', mdAuth.ensureAuth, cartController.getCart);
api.delete('/pay', mdAuth.ensureAuth, cartController.pay);

module.exports = api;