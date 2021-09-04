/* eslint-disable jsdoc/require-jsdoc */
import { errorHandler } from "../helpers/errorHandler";
import { CommandInt } from "../interfaces/CommandInt";

import { createNotification } from "./notifications/createNotification";
import { deleteNotification } from "./notifications/deleteNotification";
import { helpNotifications } from "./notifications/helpNotifications";
import { viewNotification } from "./notifications/viewNotification";

export const notification: CommandInt = {
  name: "notification",
  description: "Create, update, view, or delete a notification.",
  run: async (message, bot) => {
    try {
      const { member, content } = message;

      if (!member?.permissions.has("MANAGE_GUILD")) {
        await message.reply(
          "You do not have the permission to modify notifications!"
        );
        return;
      }

      const [, , action] = content.split(" ");

      switch (action) {
        case "create":
          await createNotification(message, bot);
          break;
        case "update":
          await message.reply("This feature coming soon!");
          break;
        case "view":
          await viewNotification(message, bot);
          break;
        case "delete":
          await deleteNotification(message, bot);
          break;
        case "help":
          await helpNotifications(message);
          break;
        default:
          await message.reply(
            `Sorry, but ${action} is not a valid method for this command.`
          );
      }
    } catch (error) {
      errorHandler("notification wrapper", error);
    }
  },
};
