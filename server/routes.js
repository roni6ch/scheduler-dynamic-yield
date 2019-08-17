const express = require("express");
const router = express.Router();
let usersController = require("./controllers/usersController");
let eventsController = require("./controllers/eventsController");
router.post("/login", usersController.login);
router.post("/signUser", usersController.signUser);
router.get("/getEvents", eventsController.getEvents);
router.post("/addEvent", eventsController.addEvent);
router.put("/editEvent", eventsController.editEvent);
router.post("/deleteEvent", eventsController.deleteEvent);

module.exports = router;
