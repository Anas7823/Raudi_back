const achat = require('../models/achat');
const modele = require('../models/modele');
const option = require('../models/option');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const token = req.query.token ? req.query.token : req.headers.authorization;
    try {
        const decodedToken = jwt.verify(token, process.env.API_KEY);
        console.log("decodedToken");
        console.log(decodedToken);

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ message: 'Invalid token or missing user ID' });
        }

        const userId = decodedToken.id;
        console.log("userId");
        console.log(userId);

        const prixModele = await modele.sum('prix', {
            where: {
                id_modele: req.params.id_modele
            }
        });

        const prixOptions = await Promise.all(options.map(async (optionId) => {
            const prixOption = await option.sum('prix', {
                where: {
                    id_option: optionId
                }
            });
            return prixOption;
        }));
        
        const prixTotalOptions = prixOptions.reduce((acc, prix) => acc + prix, 0);
        const prixTotal = prixModele + prixTotalOptions;

    
        console.log("prixTotal");
        console.log(prixTotal);

        const newAchat = await achat.create({
            prixtotal: prixTotal,
            id_modele: req.params.id_modele,
            id_user: userId
        });

        res.status(201).json(newAchat);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};



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
