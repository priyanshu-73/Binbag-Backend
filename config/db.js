import mongoose from "mongoose";

const connectDB = (mongo_uri) => {
  mongoose
    .connect(mongo_uri)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB