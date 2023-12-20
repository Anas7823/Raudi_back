const modele = require('../models/modele');

exports.createTableModele = async (req, res) => {
    await modele.sync({force: true});
    res.status(201).json({message: "table modele créé"});
}
