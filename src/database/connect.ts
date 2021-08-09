import { connect } from "mongoose";
import { errorHandler } from "../helpers/errorHandler";
import { logHandler } from "../helpers/logHandler";

export const connectDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      logHandler.log("error", "missing DB connection string.");
      return;
    }

    await connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logHandler.log("debug", "database connected!");

    return;
  } catch (error) {
    errorHandler("database connection", error);
  }
};
