import mongoose from "mongoose";

let isConnected = false; // tracks the connection

export const connectToDB = async () => {
  // to avoid unneccesary warnings
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  // if not connected then connect to the database and set isConnected to true
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};
