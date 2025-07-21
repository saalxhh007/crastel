import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("connected to DB");
    })
    .catch(err => {
      console.error("Database connection error:", err);
    });
};
