const option = require('../models/option');

exports.createTableOption = async (req, res) => {
    await option.sync({force: true});
    res.status(201).json({message: "table option créé"});
}

exports.getAllOption = async (req, res) => {
    try {
        const options = await option.findAll();
        res.status(200).json(options);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}