import { connectDatabase } from "../database/connect";
import { NotificationInt } from "../database/NotificationModel";
import { logHandler } from "../helpers/logHandler";
import { startServer } from "../helpers/server";

export const onReady = async (notifs: {
  [key: number]: NotificationInt;
}): Promise<void> => {
  await startServer();
  await connectDatabase();
  logHandler.log("debug", "Bot is online!");
};
