
const DAO = require("../dao/DAO");
const HttpStatus = require('http-status-codes');

const login = async (req, res) => {
    if (typeof(req.body.email) !== "undefined" && typeof(req.body.password) !== "undefined") {
        try { 
            const data = req.body;
            userData = await DAO.login(data.email,data.password);
         } catch (error) {
            return res.status(HttpStatus.FORBIDDEN).send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(userData);
    }
};
const signUser = async (req, res) => {
    if (typeof(req.body.name) !== "undefined" && typeof(req.body.family) !== "undefined" &&
        typeof(req.body.email) !== "undefined" && typeof(req.body.password) !== "undefined") {
        try { 
            const data = req.body;
            userData = await DAO.signUser(data.name,data.family,data.email,data.password);
         } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(userData);
    }
};

module.exports = {
    login,
    signUser
};
