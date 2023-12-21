const jwt = require('jsonwebtoken');
const user = require('../models/user');

// Vérifier si tu est Client
exports.Client = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, async(err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                let role = await user.findOne({
                    where: {
                        mail: decoded.mail
                    }
                });
                console.log(role);
                if (role.role == 0 || role.role == 99 || role.role == 1) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Vous n\'êtes pas client.' + role.role
                    });
                }
            }
        });
    } else {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
