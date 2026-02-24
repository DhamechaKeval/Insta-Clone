const mongoose = require("mongoose");

db_uri = process.env.MONGO_URI;

const connectToDB = async () => {
  await mongoose.connect(db_uri);
  console.log("Database Connected ✅");
};

module.exports = connectToDB;
