const achat = require('../models/achat');

exports.createTableAchat = async (req, res) => {
    await achat.sync({force: true});
    res.status(201).json({message: "table achat créé"});
}

