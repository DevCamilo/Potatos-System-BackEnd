'use strict'

const ClienModel = require('../models/ClientModel');
const token = require('../middlewares/auth');

function login(req, res) {
    let query = req.body;
    ClienModel.find({ userName: query.userName }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: 'Fallo al buscar el usuario' })
        } else if (data.length == 0) {
            res.status(200).send({ status: false, message: 'El usuario no existe' });
        } else {
            ClienModel.find({ userName: query.userName, password: query.password }, (err2, data2) => {
                if (err) {
                    res.status(200).send({ status: false, message: 'Fallo al buscar la contraseña' });
                } else if (data2.length == 0) {
                    res.status(200).send({ status: false, message: 'Contraseña incorrecta' });
                } else {
                    res.status(200).send({ status: true, data: data2, token: token.createToken(data2[0]._id) });
                }
            });
        }
    });
}

module.exports = {
    login
}