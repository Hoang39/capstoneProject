const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DBNAME,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Fail to connect to database");
  }
}

module.exports = { connect };
