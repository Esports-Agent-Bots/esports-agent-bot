import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onMessage = async (message: Message): Promise<void> => {
  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(process.env.PREFIX || "!esports")) {
    return;
  }

  for (const Command of CommandList) {
    const [, target] = message.content.split(" ");
    if (Command.name === target) {
      await Command.run(message);
      break;
    }
  }
};
