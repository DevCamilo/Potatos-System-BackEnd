'use strict'

const CropModel = require('../models/CropModel');
const moment = require('moment');

/**
 * Crea un nuevo cultivo en la base de datos
 * @param {*} req 
 * @param {*} res 
 */
function createCrop(req, res) {
    const query = req.body;
    CropModel.create(query, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al guardar el cultivo' });
        } else {
            res.status(200).send({ status: true, message: 'Cultivo creado exitosamente' });
        }
    });
}

/**
 * Trae todos los cultivos con status: true
 * @param {*} req 
 * @param {*} res 
 */
function listCrop(req, res) {
    CropModel.find({ status: true }).sort({ created_at: -1 }).populate('employees', 'name').populate('responsable', 'name').exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al listar los cultivos' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

/**
 * Trae el cultivo segun si _id
 * @param {*} req 
 * @param {*} res 
 */
function listCropById(req, res) {
    CropModel.findById(req.query.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al listar el cultivo' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

/**
 * Actualiza el cultivo según el _id
 * @param {*} req 
 * @param {*} res 
 */
function updateCrop(req, res) {
    let update = req.body;
    update.updated_at = new Date(moment().toISOString());
    CropModel.findByIdAndUpdate(update.id, update, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al actuaizar el cultivo' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

/**
 * Cambia el status del cultivo para "eliminarlo"
 * @param {*} req 
 * @param {*} res 
 */
function deleteCrop(req, res) {
    CropModel.findByIdAndUpdate(req.query.id, {
        status: false,
        updated_at: new Date(moment().toISOString())
    }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al eliminar el cultivo' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

function listCropByResponsable(req, res) {
    CropModel.find({ responsable: req.query.id }).sort({ created_at: -1 }).populate('employees', 'name').exec((err, data) => {
        if (err) {
            res.status(200).send({ status: false, error: 'Fallo al listar los datos' });
        } else {
            res.status(200).send({ status: true, data: data });
        }
    });
}

module.exports = {
    createCrop,
    listCrop,
    listCropById,
    updateCrop,
    deleteCrop,
    listCropByResponsable
}
