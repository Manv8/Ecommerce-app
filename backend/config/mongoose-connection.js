// db/connect.js
import mongoose from "mongoose";
import config from "config";
import debug from "debug";

const dbgr = debug("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/shopping-app`)
  .then(() => {
    dbgr("MongoDB connected");
  })
  .catch((err) => {
    dbgr("Connection error:", err);
  });

export default mongoose.connection;
