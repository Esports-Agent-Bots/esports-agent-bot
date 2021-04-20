import { MessageEmbed } from "discord.js";
import { errorHandler } from "../helpers/errorHandler";
import { CommandInt } from "../interfaces/CommandInt";

export const ping: CommandInt = {
  name: "ping",
  description: "Pong!",
  run: async (message) => {
    try {
      const { channel, createdTimestamp } = message;

      const timeDiff = Date.now() - createdTimestamp;

      const pongEmbed = new MessageEmbed();

      pongEmbed.setTitle("Pong");
      pongEmbed.setDescription(`Response Time: ${timeDiff}ms`);

      await channel.send(pongEmbed);

      return;
    } catch (error) {
      errorHandler("ping command", error);
    }
  },
};
