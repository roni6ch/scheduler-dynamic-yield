
const DAO = require("../dao/DAO");
const HttpStatus = require('http-status-codes');
const validate = require('../validations/validations');

const login = async (req, res) => {
    if (validate.checkValidation(req.body)) {
        try { 
            const data = req.body;
            userData = await DAO.login(data.email,data.password);
         } catch (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(userData);
    }
    return res.status(HttpStatus.FORBIDDEN).send({ 'error':'Please fill all the fields' });
};
const signUser = async (req, res) => {
    if (validate.checkValidation(req.body)) {
        debugger;
        try { 
            const data = req.body;
            userData = await DAO.signUser(data.name,data.family,data.email,data.password);
         } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(userData);
    }
    return res.status(HttpStatus.FORBIDDEN).send({ 'error':'Please fill all the fields' });
};

module.exports = {
    login,
    signUser
};
