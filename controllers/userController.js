const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createTableUser = async (req, res) => {
    await user.sync({force: true});
    res.status(201).json({message: "table user créé"});
}

exports.createUser = async (req, res) => {
    const {pseudo, mail, password, role} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await user.create({
        pseudo: pseudo,
        mail: mail,
        password: hash,
        role: role,
    });
    res.status(201).json(newUser);
}

exports.login = async (req, res) => {
    const {mail, password} = req.body;
    const userFound = await user.findOne({
        where: {
            mail: mail
        }
    });
    if (userFound) {
        console.log("Utilisateur trouvé");
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (isMatch) {
            const token = jwt.sign({id: userFound.id_user, mail: userFound.mail}, process.env.API_KEY, {expiresIn: '1h'});
            res.status(200).json({token: token});
        } else {
            res.status(401).json({message: "Mot de passe incorrect"});
        }
    } else {
        res.status(404).json({message: "Utilisateur non trouvé"});
    }
}

exports.logout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        // Décoder le token pour obtenir les informations de l'utilisateur
        const decoded = jwt.verify(token, process.env.API_KEY);

        // Récupérer la liste actuelle des tokens révoqués
        const user = await User.findByPk(decoded.id_user);
        const currentRevokedTokens = user.revokedTokens || '';

        // Mettre à jour la liste des tokens révoqués dans la base de données
        await user.update({ revokedTokens: `${currentRevokedTokens},${token}` });

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}