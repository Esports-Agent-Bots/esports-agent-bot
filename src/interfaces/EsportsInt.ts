import { Client } from "discord.js";
import { NotificationInt } from "../database/NotificationModel";

export interface Esports extends Client {
  notifications: { [key: number]: NotificationInt };
  intervals: { [key: number]: NodeJS.Timeout };
}
