import { Message } from "discord.js";
import { Esports } from "./EsportsInt";

export interface CommandInt {
  name: string;
  description: string;
  run: (message: Message, bot: Esports) => Promise<void>;
}
