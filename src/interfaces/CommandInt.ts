import { Message } from "discord.js";

import { Esports } from "./EsportsInt";

export interface CommandInt {
  name: string;
  description: string;
  /**
   * Executes the logic for the specific command.
   *
   * @param {Message} message The message that triggered the command.
   * @param {Esports} bot The bot instance.
   */
  run: (message: Message, bot: Esports) => Promise<void>;
}
