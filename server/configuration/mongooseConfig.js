const mongoose = require("mongoose");

module.exports = function() {
  // Build the connection string
  const dbURI = 'mongodb+srv://Admin:123@cluster0-rmhe5.gcp.mongodb.net/Scheduler?retryWrites=true&w=majority';
 
  // Create the database connection
  const db = mongoose.connect(dbURI,{ useCreateIndex: true,useNewUrlParser: true });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", function() {
    console.log("Mongoose URL open to " + dbURI);
  });
  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
    mongoose.connect(dbURI);
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  return db;
};
