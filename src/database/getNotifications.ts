import { errorHandler } from "../helpers/errorHandler";
import { logHandler } from "../helpers/logHandler";
import NotificationModel, { NotificationInt } from "./NotificationModel";

export const getNotifications = async (notifs: {
  [key: number]: NotificationInt;
}) => {
  try {
    const list = await NotificationModel.find();

    list.forEach((notif) => {
      notifs[notif.number] = notif;
    });

    logHandler.log("debug", "Cached notification data!");
  } catch (error) {
    errorHandler("cache notifications", error);
  }
};
