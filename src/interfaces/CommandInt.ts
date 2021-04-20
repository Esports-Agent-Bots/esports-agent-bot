import { Message } from "discord.js";

export interface CommandInt {
  name: string;
  description: string;
  run: (message: Message) => Promise<void>;
}
