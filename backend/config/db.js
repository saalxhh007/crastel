import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://abderrahmenmeghzili:123789456s@cluster0.fzfci.mongodb.net/CRASTEL"
    )
    .then(() => {
      console.log("connected to DB");
    });
};
