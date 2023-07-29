import mongoose from "mongoose";

export default function dbConfig() {
  try {
    mongoose.connect(
      "mongodb+srv://amitbhatia:rCfhrl4kzRqi1Hj4@amitatlas.bjqch7f.mongodb.net/"
    );
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
