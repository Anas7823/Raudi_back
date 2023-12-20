const modele = require('../models/modele');

exports.createTableModele = async (req, res) => {
    await modele.sync({force: true});
    res.status(201).json({message: "table modele créé"});
}

exports.getAllModele = async (req, res) => {
    try {
        const modeles = await modele.findAll();
        res.status(200).json(modeles);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}