import { Message } from "discord.js";
import { NotificationInt } from "../database/NotificationModel";

export interface CommandInt {
  name: string;
  description: string;
  run: (
    message: Message,
    notifs: { [key: number]: NotificationInt }
  ) => Promise<void>;
}
