import { MessageEmbed } from "discord.js";
import { errorHandler } from "../helpers/errorHandler";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const about: CommandInt = {
  name: "about",
  description: "Provides information about the bot.",
  run: async (message, bot) => {
    try {
      const { channel } = message;

      const aboutEmbed = new MessageEmbed();

      aboutEmbed.setTitle("About Esports Agent Bot");
      aboutEmbed.setDescription(
        "I am a bot created by [nhcarrigan](https://www.nhcarrigan.com) for the Esports Agent Discord server. If you like what I do, please consider [supporting my development](https://github.com/sponsors/nhcarrigan). You can also [view my source code](https://www.github.com/nhcarrigan/esports-agent-bot)."
      );
      aboutEmbed.addFields([
        {
          name: "Available Commands",
          value: CommandList.length.toString(),
          inline: true,
        },
        {
          name: "Bot Version",
          value: process.env.npm_package_version || "unknown",
          inline: true,
        },
        {
          name: "Creation Date",
          value: "20 April 2021",
          inline: true,
        },
        {
          name: "Server Count",
          value: bot.guilds.cache.size.toString(),
          inline: true,
        },
        {
          name: "Active Notifications",
          value: Object.keys(bot.notifications).length.toString(),
          inline: true,
        },
      ]);

      await channel.send({ embeds: [aboutEmbed] });
    } catch (error) {
      errorHandler("about command", error);
    }
  },
};
