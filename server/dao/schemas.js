const mongoose = require("mongoose");

// Users Schema
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    family: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      sparse: true,
      trim: true
    },
    password: {
      type: String,
      trim: true
    }
  },
  { collection: "Users" }
);

// Events Schema
const eventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    room: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      trim: true
    },
    backgroundColor: {
      type: String,
      trim: true
    },
    start: {
      type: String,
      trim: true
    },
    end: {
      type: String,
      trim: true
    }
  },
  { collection: "Events" }
);

const UserModel = mongoose.model("UserModel", usersSchema);
const EventsModel = mongoose.model("EventsModel", eventsSchema);

module.exports = {
  UserModel,
  EventsModel
};
