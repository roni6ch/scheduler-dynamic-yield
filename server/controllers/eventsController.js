
const DAO = require("../dao/DAO");
const HttpStatus = require('http-status-codes');
const validate = require('../validations/validations');

const getEvents = async (req, res) => {
        try { 
            events = await DAO.getEvents();
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
};
const addEvent = async (req, res) => {
    if (validate.checkValidation(req.body)) {
        try { 
            events = await DAO.addEvent(req.body);
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
    }
    return res.send({ 'error':'Please fill all the fields' });
};

const editEvent = async (req, res) => {
    if (validate.checkValidation(req.body)) {
        try { 
            events = await DAO.editEvent(req.body);
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
    }
    return res.send({ 'error':'There is a problem editing this event' });
};
const deleteEvent = async (req, res) => {
    if (typeof(req.body.id) !== "undefined") {
        try { 
            result = await DAO.deleteEvent(req.body.id);
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(result);
    }
    return res.send({ 'error':'There is a problem deleting this event' });
};


module.exports = {
    getEvents,
    addEvent,
    editEvent,
    deleteEvent
};
