import { CommandInt } from "../interfaces/CommandInt";

export const notification: CommandInt = {
  name: "notification",
  description: "Create, update, view, or delete a notification.",
  run: async (message, notifs) => {
    const { content } = message;

    const [, , action] = content.split(" ");

    switch (action) {
      case "create":
        // run create handler
        break;
      case "update":
        // run update handler
        break;
      case "view":
        // run view handler
        break;
      case "delete":
        // run delete handler
        break;
      default:
        await message.reply(
          `Sorry, but ${action} is not a valid method for this command.`
        );
    }
  },
};
