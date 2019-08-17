const schemas = require("./schemas");
const UserModel = schemas.UserModel;
const EventsModel = schemas.EventsModel;
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  let result;
  let resAfterPasswordCompare;
  try {
    result = await UserModel.find({ email: email }).limit(1);
  } catch (e) {
    throw e.toString();
  }
  if (result.length === 0) {
    throw "User Not Found";
  }
  let hashPassword = await bcrypt.hashSync(password, 10);
  await bcrypt.compare(hashPassword, result[0].password, function(err, res) {
    if (err) {
      throw "Incorrect Password";
    }
    resAfterPasswordCompare = result[0];
  });

  return resAfterPasswordCompare;
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
