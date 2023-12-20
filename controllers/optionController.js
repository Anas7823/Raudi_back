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

exports.getOneOption = async (req, res) => {
    try {
        const optionFound = await option.findOne({
            where: {
                id_option: req.params.id
            }
        });
        if (optionFound == null) {
            return res.status(400).json({message: "option introuvable"});
        }
        res.status(200).json(optionFound);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.addOptionToModele = async (req, res) => {
    try {
        const modeleFound = await modele.findOne({
            where: {
                id_modele: req.params.id
            }
        });
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        const optionFound = await option.findOne({
            where: {
                id_option: req.body.id_option
            }
        });
        if (optionFound == null) {
            return res.status(400).json({message: "option introuvable"});
        }
        await modeleFound.addOption(optionFound);
        res.status(201).json({message: "option ajouté au modele"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}