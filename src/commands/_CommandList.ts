import { CommandInt } from "../interfaces/CommandInt";
import { notification } from "./notification";
import { ping } from "./ping";

export const CommandList: CommandInt[] = [notification, ping];
