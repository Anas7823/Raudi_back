const possede = require('../models/possede');

exports.createTablePossede = async (req, res) => {
    await possede.sync({force: true});
    res.status(201).json({message: "table possede créé"});
}

exports.getAllPossede = async (req, res) => {
    try {
        const possedes = await possede.findAll();
        res.status(200).json(possedes);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}