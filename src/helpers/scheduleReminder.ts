import { TextChannel } from "discord.js";
import NotificationModel, {
  NotificationInt,
} from "../database/NotificationModel";
import { Esports } from "../interfaces/EsportsInt";
import { errorHandler } from "./errorHandler";
import { logHandler } from "./logHandler";

export const scheduleReminder = (
  notification: NotificationInt,
  bot: Esports
): void => {
  try {
    const guild = bot.guilds.cache.get(notification.guildId);

    if (!guild) {
      logHandler.log(
        "warn",
        `Could not find guild with id ${notification.guildId} for ${notification.number}`
      );
      return;
    }

    const channel = guild.channels.cache.get(
      notification.channelId
    ) as TextChannel;

    if (!channel) {
      logHandler.log(
        "warn",
        `Could not find channel with id ${notification.channelId} for #${notification.number}`
      );
      return;
    }

    const target = setInterval(
      async () =>
        await sendReminder(
          channel,
          notification.content,
          bot,
          notification.number,
          notification.messageId
        ),
      notification.frequency * 60000
    );

    bot.intervals[notification.number] = target;

    logHandler.log(
      "info",
      `Set interval for notification #${notification.number}`
    );
  } catch (error) {
    errorHandler(`schedule reminder for #${notification.number}`, error);
  }
};

const sendReminder = async (
  channel: TextChannel,
  content: string,
  bot: Esports,
  number: number,
  messageId: string
): Promise<void> => {
  try {
    const last = await channel.messages.fetch({ limit: 1 });

    if (last.first()?.author.id === bot.user?.id) {
      logHandler.log("info", `Skipped sending #${number} as was last message`);
      return;
    }

    if (messageId) {
      const lastMessage = await channel.messages.fetch(messageId);
      if (lastMessage.deletable) {
        await lastMessage.delete();
      }
    }

    const sent = await channel.send(content);

    const data = await NotificationModel.findOne({ number: number });

    if (data) {
      data.messageId = sent.id;
      await data.save();
    }

    bot.notifications[number].messageId = sent.id;
  } catch (error) {
    errorHandler(`send reminder for #${number}`, error);
  }
};
