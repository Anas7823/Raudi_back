const modele = require('../models/modele');
const possede = require('../models/possede');
const option = require('../models/option');

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

exports.getModeleWithOption = async (req, res) => { // Afficher le modele avec ses options (client)
    try {
        const modeleFound = await modele.findOne({
            where: {
                id_modele: req.params.id
            }
        });
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        const options = await possede.findAll({
            where: {
                id_modele: req.params.id
            },
            include: [{
                model: option,
                as: 'Option'
            }]
        });
        res.status(200).json({modeleFound, options});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.createModele = async (req, res) => {
    const {nom, nbPortes, moteur, nbPlaces, prix} = req.body;
    const newModele = await modele.create({
        nom: nom,
        nbPortes: nbPortes,
        moteur: moteur,
        nbPlaces: nbPlaces,
        prix: prix,
    });
    if (newModele) {
        res.status(201).json(newModele);
    } else {
        res.status(400).json({message: "erreur dans la création du modele"});
    }
}

exports.deleteModele = async (req, res) => {
    try {
        const modeleFound = await modele.findOne({
            where: {
                id_modele: req.params.id
            }
        });
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        const modeleDeleted = await modele.destroy({
            where: {
                id_modele: req.params.id
            }
        });
        if (modeleDeleted) {
            res.status(200).json({message: "modele supprimé"});
        } else {
            res.status(400).json({message: "erreur dans la suppression du modele"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.updateModele = async (req, res) => {
    const {nom, nbPortes, moteur, nbPlaces, prix} = req.body;

    try {
        const modeleFound = await modele.findOne({
            where: {
                id_modele: req.body.id
            }
        });
        if (modeleFound == null) {
            return res.status(400).json({message: "modele introuvable"});
        }
        const modeleUpdated = await modele.update({
            nom: nom,
            nbPortes: nbPortes,
            moteur: moteur,
            nbPlaces: nbPlaces,
            prix: prix,
        }, {
            where: {
                id_modele: req.body.id
            }
        });
        if (modeleUpdated) {
            res.status(200).json({message: "modele modifié"});
        } else {
            res.status(400).json({message: "erreur dans la modification du modele"});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
