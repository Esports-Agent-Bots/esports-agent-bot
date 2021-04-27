import { Client, Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { NotificationInt } from "../database/NotificationModel";
import { IntervalsInt } from "../interfaces/IntervalsInt";

export const onMessage = async (
  message: Message,
  notifs: { [key: number]: NotificationInt },
  intervals: IntervalsInt,
  bot: Client
): Promise<void> => {
  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(process.env.PREFIX || "!esports")) {
    return;
  }

  for (const Command of CommandList) {
    const [, target] = message.content.split(" ");
    if (Command.name === target) {
      await Command.run(message, notifs, intervals, bot);
      break;
    }
  }
};
