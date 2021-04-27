import { Client, Message } from "discord.js";
import { NotificationInt } from "../database/NotificationModel";
import { IntervalsInt } from "./IntervalsInt";

export interface CommandInt {
  name: string;
  description: string;
  run: (
    message: Message,
    notifs: { [key: number]: NotificationInt },
    intervals: IntervalsInt,
    bot: Client
  ) => Promise<void>;
}
