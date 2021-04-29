import { TextChannel } from "discord.js";
import { NotificationInt } from "../database/NotificationModel";
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
          notification.number
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
  number: number
): Promise<void> => {
  try {
    const last = await channel.messages.fetch({ limit: 1 });

    if (last.first()?.author.id === bot.user?.id) {
      logHandler.log("info", `Skipped sending #${number} as was last message`);
      return;
    }

    await channel.send(content);
  } catch (error) {
    errorHandler(`send reminder for #${number}`, error);
  }
};
