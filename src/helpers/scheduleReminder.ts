import { Channel, Client, Guild, TextChannel } from "discord.js";
import { NotificationInt } from "../database/NotificationModel";
import { IntervalsInt } from "../interfaces/IntervalsInt";
import { logHandler } from "./logHandler";

export const scheduleReminder = (
  notification: NotificationInt,
  intervals: IntervalsInt,
  bot: Client
) => {
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

  intervals[notification.number] = target;

  logHandler.log(
    "info",
    `Set interval for notification #${notification.number}`
  );
};

const sendReminder = async (
  channel: TextChannel,
  content: string,
  bot: Client,
  number: number
) => {
  const last = await channel.messages.fetch({ limit: 1 });

  if (last.first()?.author.id === bot.user?.id) {
    logHandler.log("info", `Skipped sending #${number} as was last message`);
    return;
  }

  await channel.send(content);
};
