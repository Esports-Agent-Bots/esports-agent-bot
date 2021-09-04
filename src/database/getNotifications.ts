import { errorHandler } from "../helpers/errorHandler";
import { logHandler } from "../helpers/logHandler";
import { Esports } from "../interfaces/EsportsInt";

import NotificationModel from "./NotificationModel";

/**
 * Fetches notifications from the database and caches them.
 *
 * @param {Esports} bot The bot instance.
 */
export const getNotifications = async (bot: Esports): Promise<void> => {
  try {
    const list = await NotificationModel.find();

    list.forEach((notif) => {
      bot.notifications[notif.number] = notif;
    });

    logHandler.log("debug", "Cached notification data!");
  } catch (error) {
    errorHandler("cache notifications", error);
  }
};
