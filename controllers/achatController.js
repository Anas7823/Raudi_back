const achat = require('../models/achat');
const modele = require('../models/modele');
const option = require('../models/option');
const sequelize = require('sequelize');

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


exports.createAchat = async (req, res) => {
    console.log(req.params.id_modele);
    try {
        const prixModele = await modele.sum('prix', {
            where: {
                id_modele: req.params.id_modele
            }
        });
        const prixOption = await option.sum('prix', {
            where: {
                id_option: req.body.optionId
            }
        });
        prixTotal = prixModele + prixOption;
        console.log(prixTotal, req.params.id_modele)
        const newAchat = await achat.create({
            prixtotal: prixTotal,
            id_modele: req.params.id_modele,
            id_user: 1// utilise JWT !
        });
        res.status(201).json(newAchat);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

// Total de gain  du mois courant
exports.getTotalOfMonth = async (req, res) => {
    try {
        const total = await achat.sum('prixTotal', {
            where: sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), new Date().getMonth() + 1)
        });
        res.status(200).json(total);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
