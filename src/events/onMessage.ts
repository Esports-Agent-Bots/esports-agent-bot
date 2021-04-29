import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { Esports } from "../interfaces/EsportsInt";

export const onMessage = async (
  message: Message,
  bot: Esports
): Promise<void> => {
  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(process.env.PREFIX || "!esports")) {
    if (message.mentions.users.first() === bot.user) {
      await message.reply(
        `How can I help? Try \`${
          process.env.prefix || "!esports"
        } help\` to see my available commands!`
      );
    }
    return;
  }

  for (const Command of CommandList) {
    const [, target] = message.content.split(" ");
    if (Command.name === target) {
      await Command.run(message, bot);
      break;
    }
  }
};
