import { connectDatabase } from "../database/connect";
import { getNotifications } from "../database/getNotifications";
import { logHandler } from "../helpers/logHandler";
import { scheduleReminder } from "../helpers/scheduleReminder";
import { startServer } from "../helpers/server";
import { Esports } from "../interfaces/EsportsInt";

/**
 * Handles the ready event from Discord.
 *
 * @param {Esports} bot The bot instance.
 */
export const onReady = async (bot: Esports): Promise<void> => {
  await startServer();
  await connectDatabase();
  await getNotifications(bot);
  const notifications = Object.values(bot.notifications);
  for (const notif of notifications) {
    scheduleReminder(notif, bot);
  }
  logHandler.log("debug", "Bot is online!");
};
