import { errorHandler } from "../helpers/errorHandler";
import { logHandler } from "../helpers/logHandler";
import { Esports } from "../interfaces/EsportsInt";
import NotificationModel from "./NotificationModel";

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
