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

exports.getOneModele = async (req, res) => {
    try {
        const modeleFound = await modele.findOne({
            where: {
                id_modele: req.params.id
            }
        });
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        res.status(200).json(modeleFound);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.createModele = async (req, res) => {
    try {
        const modeleCreated = await modele.create(req.body);
        res.status(201).json(modeleCreated);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}