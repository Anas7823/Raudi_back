const option = require('../models/option');
const modele = require('../models/modele');
const Posseder = require('../models/possede');

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

exports.addOptionToModele = async (req, res) => { // Ajouter une option disponible a un modele (amdin)
    try {
        console.log(req.params.id_modele);
        const modeleFound = await modele.findByPk(req.params.id_modele);
        console.log("cheh")
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        // optionFound est un tableau, il peut contener plusieurs options
        const optionFound = await option.findAll({
            where: {
                id_option: req.body.id_option
            }
        });
        if (optionFound.length <= 0) {
            return res.status(400).json({message: "Aucune option n'a été séléctionné"});
        } else if (optionFound.length > 0) { // option deja posseder 
            const optionPosseder = await Posseder.findAll({
                where: {
                    id_modele: req.params.id_modele,
                    id_option: req.body.id_option
                }
            });
            if (optionPosseder.length > 0) {
                return res.status(400).json({message: "Option déja posseder par le modèle"});
            }
        }
        optionFound.forEach(async (optionFound) => { // optionFound est un tableau, il peut contener plusieurs options
            await Posseder.create({
                id_option: optionFound.id_option,
                id_modele: modeleFound.id_modele,
            });
        });       
        res.status(201).json({message: "option ajouté au modele"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.createOption = async (req, res) => { // Créer une option (admin)
    try {
        const optionFound = await option.findOne({
            where: {
                nom_option: req.body.nom_option
            }
        });
        if (optionFound != null) {
            return res.status(400).json({message: "option déja existante"});
        }
        await option.create({
            nom_option: req.body.nom_option,
            prix_option: req.body.prix_option
        });
        res.status(201).json({message: "option créé"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}