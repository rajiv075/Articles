const mongoose = require("mongoose");
const config = require("config");
const logger = require("../logger");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB connected");
    logger.info("datadase connected successfully");
  } catch (error) {
    logger.error(error);
    logger.info(error.message);
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
