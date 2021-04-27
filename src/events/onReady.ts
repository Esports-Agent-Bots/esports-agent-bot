import { connectDatabase } from "../database/connect";
import { getNotifications } from "../database/getNotifications";
import { NotificationInt } from "../database/NotificationModel";
import { logHandler } from "../helpers/logHandler";
import { startServer } from "../helpers/server";

export const onReady = async (notifs: {
  [key: number]: NotificationInt;
}): Promise<void> => {
  await startServer();
  await connectDatabase();
  await getNotifications(notifs);
  logHandler.log("debug", "Bot is online!");
};
