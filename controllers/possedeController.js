const possede = require('../models/possede');

exports.createTablePossede = async (req, res) => {
    await possede.sync({force: true});
    res.status(201).json({message: "table possede créé"});
}
