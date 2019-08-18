const schemas = require("./schemas");
const UserModel = schemas.UserModel;
const EventsModel = schemas.EventsModel;
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  let result;
  try {
    result = await UserModel.find({ email: email }).limit(1);
  } catch (e) {
    throw new Error(e.toString());
  }
  if (result.length === 0) {
    throw new Error("User Not Found");
  }
  if(bcrypt.compareSync(password,result[0].password)) {
    return result[0];
   } else {
    throw new Error("Incorrect Password");
   }

};
const signUser = async (name, family, email, password) => {
  let result;
  try {
    result = await UserModel.create({ name, family, email, password });
  } catch (e) {
    throw "User already exist";
  }
  if (result.length === 0) {
    throw false;
  }
  return true;
};
const getEvents = async () => {
  let result;
  try {
    result = await EventsModel.find();
  } catch (e) {
    throw e.toString();
  }
  if (result.length === 0) {
    throw false;
  }
  return result;
};
const addEvent = async params => {
  const { title, room, backgroundColor, start, end, author } = params;
  let result;
  try {
    result = await EventsModel.create({
      title,
      room,
      backgroundColor,
      start,
      end,
      author
    });
  } catch (e) {
    throw e.toString();
  }
  if (result.length === 0) {
    throw false;
  }
  return result;
};
const editEvent = async params => {
  const { id, title, room, backgroundColor, start, end, author } = params;
  let result;
  try {
    result = await EventsModel.findOneAndUpdate(
      { _id: id },
      { $set: { title, room, backgroundColor, start, end, author } },
      { new: true }
    );
  } catch (e) {
    throw e.toString();
  }
  if (result.length === 0) {
    throw false;
  }
  return result;
};
const deleteEvent = async id => {
  let result;
  try {
    result = await EventsModel.deleteOne({ _id: id });
  } catch (e) {
    throw e.toString();
  }
  if (result.length === 0) {
    throw false;
  }
  return result;
};

module.exports = {
  login,
  signUser,
  getEvents,
  addEvent,
  editEvent,
  deleteEvent
};
