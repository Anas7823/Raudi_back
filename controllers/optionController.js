const option = require('../models/option');

exports.createTableOption = async (req, res) => {
    await option.sync({force: true});
    res.status(201).json({message: "table option créé"});
}
