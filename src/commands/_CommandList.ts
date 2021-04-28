import { CommandInt } from "../interfaces/CommandInt";
import { about } from "./about";
import { help } from "./help";
import { notification } from "./notification";
import { ping } from "./ping";

export const CommandList: CommandInt[] = [about, help, notification, ping];
