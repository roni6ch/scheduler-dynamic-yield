
const DAO = require("../dao/DAO");
const HttpStatus = require('http-status-codes');

const getEvents = async (req, res) => {
        try { 
            events = await DAO.getEvents();
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
};
const addEvent = async (req, res) => {
    if (typeof(req.body.title) !== "undefined" && typeof(req.body.room) !== "undefined" &&
    typeof(req.body.backgroundColor) !== "undefined" && typeof(req.body.start) !== "undefined" &&
    typeof(req.body.end) !== "undefined" && typeof(req.body.author) !== "undefined") {
        try { 
            events = await DAO.addEvent(req.body);
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
    }
};

const editEvent = async (req, res) => {
    if (typeof(req.body.id) !== "undefined" && typeof(req.body.title) !== "undefined" && typeof(req.body.room) !== "undefined" &&
    typeof(req.body.backgroundColor) !== "undefined" && typeof(req.body.start) !== "undefined" &&
    typeof(req.body.end) !== "undefined" && typeof(req.body.author) !== "undefined") {
        try { 
            events = await DAO.editEvent(req.body);
         } catch (error) {
            return res.send({ 'error':error });
        }
        return res.status(HttpStatus.OK).json(events);
    }
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
};


module.exports = {
    getEvents,
    addEvent,
    editEvent,
    deleteEvent
};
