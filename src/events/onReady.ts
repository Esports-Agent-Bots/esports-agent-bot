import { Client } from "discord.js";
import { connectDatabase } from "../database/connect";
import { getNotifications } from "../database/getNotifications";
import { NotificationInt } from "../database/NotificationModel";
import { logHandler } from "../helpers/logHandler";
import { scheduleReminder } from "../helpers/scheduleReminder";
import { startServer } from "../helpers/server";
import { IntervalsInt } from "../interfaces/IntervalsInt";

export const onReady = async (
  notifs: {
    [key: number]: NotificationInt;
  },
  intervals: IntervalsInt,
  bot: Client
): Promise<void> => {
  await startServer();
  await connectDatabase();
  await getNotifications(notifs);
  const notifications = Object.values(notifs);
  for (const notif of notifications) {
    scheduleReminder(notif, intervals, bot);
  }
  logHandler.log("debug", "Bot is online!");
};
