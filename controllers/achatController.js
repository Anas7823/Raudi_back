const achat = require('../models/achat');

exports.createTableAchat = async (req, res) => {
    await achat.sync({force: true});
    res.status(201).json({message: "table achat créé"});
}

exports.getAllAchat = async (req, res) => {
    try {
        const achats = await achat.findAll();
        res.status(200).json(achats);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

