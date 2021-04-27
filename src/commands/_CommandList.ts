import { CommandInt } from "../interfaces/CommandInt";
import { about } from "./about";
import { notification } from "./notification";
import { ping } from "./ping";

export const CommandList: CommandInt[] = [about, notification, ping];
