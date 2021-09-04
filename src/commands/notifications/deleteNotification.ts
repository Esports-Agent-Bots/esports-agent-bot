import { Message } from "discord.js";

import NotificationModel from "../../database/NotificationModel";
import { errorHandler } from "../../helpers/errorHandler";
import { Esports } from "../../interfaces/EsportsInt";

/**
 * Handles the deletion of an existing notification.
 *
 * @param {message} message The message object received from Discord.
 * @param {Esports} bot The bot object.
 */
export const deleteNotification = async (
  message: Message,
  bot: Esports
): Promise<void> => {
  try {
    const [, , , number] = message.content.split(" ");

    const target = parseInt(number, 10);

    if (isNaN(target)) {
      await message.reply(
        "Sorry, but please provide the notification number you would like me to delete."
      );
      return;
    }

    if (!bot.notifications[target]) {
      await message.reply(
        "Sorry, but I cannot find a notification matching that number."
      );
      return;
    }

    const dataTarget = await NotificationModel.findOne({ number: target });

    if (dataTarget?.guildId !== message.guild?.id) {
      await message.reply(
        "This notification does not belong to you and cannot be deleted."
      );
      return;
    }

    await dataTarget?.delete();

    delete bot.notifications[target];

    clearInterval(bot.intervals[target]);

    await message.channel.send(
      `Deleted the #${dataTarget?.number} notification in <#${dataTarget?.channelId}>.`
    );
  } catch (error) {
    errorHandler("delete notification", error);
  }
};
