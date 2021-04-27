import { Message } from "discord.js";
import NotificationModel, {
  NotificationInt,
} from "../../database/NotificationModel";
import { errorHandler } from "../../helpers/errorHandler";
import { IntervalsInt } from "../../interfaces/IntervalsInt";

export const deleteNotification = async (
  message: Message,
  notifs: { [key: number]: NotificationInt },
  intervals: IntervalsInt
) => {
  try {
    const [, , , number] = message.content.split(" ");

    const target = parseInt(number, 10);

    if (isNaN(target)) {
      await message.reply(
        "Sorry, but please provide the notification number you would like me to delete."
      );
      return;
    }

    if (!notifs[target]) {
      await message.reply(
        "Sorry, but I cannot find a notification matching that number."
      );
      return;
    }

    const dataTarget = await NotificationModel.findOne({ number: target });

    await dataTarget?.delete();

    delete notifs[target];

    clearInterval(intervals[target]);

    await message.channel.send(
      `Deleted the #${dataTarget?.number} notification in <#${dataTarget?.channelId}>.`
    );
  } catch (error) {
    errorHandler("delete notification", error);
  }
};
