import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGODB_URL;

export default function dbConfig() {
  try {
    mongoose.connect(`${uri}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("there must be an error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
