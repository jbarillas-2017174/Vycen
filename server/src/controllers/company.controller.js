'use strict'

const Company = require('../models/company');
const { validateData } = require("../utils/validate");

exports.createCompany = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            address: params.address,
            phone: params.phone,
            email: params.email,
            description: params.description
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const already = await Company.findOne({ name: params.name });
        if (already) return res.status(400).send({ message: 'Company already exist' });
        const company = new Company(data);
        await company.save();
        return res.send({ message: 'Company saved' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({});
        if (!companies) return res.status(404).send({ message: 'There are no any companies here' });
        return res.send({ message: 'Companies found:', companies })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findOne({ _id: companyId });
        if (!company) return res.status(404).send({ message: 'Company not found' });
        return res.send({ message: 'Company found:', exist: company })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}