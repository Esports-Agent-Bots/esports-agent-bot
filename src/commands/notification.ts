import { errorHandler } from "../helpers/errorHandler";
import { CommandInt } from "../interfaces/CommandInt";
import { createNotification } from "./notifications/createNotification";
import { viewNotification } from "./notifications/viewNotification";

export const notification: CommandInt = {
  name: "notification",
  description: "Create, update, view, or delete a notification.",
  run: async (message, notifs) => {
    try {
      const { content } = message;

      const [, , action] = content.split(" ");

      switch (action) {
        case "create":
          await createNotification(message, notifs);
          break;
        case "update":
          // run update handler
          break;
        case "view":
          await viewNotification(message, notifs);
          break;
        case "delete":
          // run delete handler
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
