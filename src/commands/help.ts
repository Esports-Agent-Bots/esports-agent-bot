import { MessageEmbed } from "discord.js";
import { errorHandler } from "../helpers/errorHandler";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  description: "Provides a list of available commands.",
  run: async (message) => {
    try {
      const [prefix] = message.content.split(" ");
      const commandsString = CommandList.map(
        (el) => `\`${el.name}\`: ${el.description}`
      )
        .sort()
        .join("\n");

      const helpEmbed = new MessageEmbed();
      helpEmbed.setTitle("Available Commands");
      helpEmbed.setDescription(
        `These are my available commands. Call them with \`${prefix} <command>\`.`
      );
      helpEmbed.addField("Commands", commandsString);

      await message.channel.send(helpEmbed);
    } catch (error) {
      errorHandler("help command", error);
    }
  },
};
