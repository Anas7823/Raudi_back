const user = require('../models/user');

exports.createTableUser = async (req, res) => {
    await user.sync({force: true});
    res.status(201).json({message: "table user créé"});
}
