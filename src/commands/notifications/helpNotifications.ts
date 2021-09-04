import { Message, MessageEmbed } from "discord.js";

import { errorHandler } from "../../helpers/errorHandler";

/**
 * Generates instructions for interacting with the bot.
 *
 * @param {Message} message The message object from Discord.
 */
export const helpNotifications = async (message: Message): Promise<void> => {
  try {
    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("Notifications System");
    helpEmbed.setDescription(
      "My notification system is robust and complex. There are a few options you have for managing your server notifications."
    );
    helpEmbed.addFields([
      {
        name: "Create a new notification",
        value:
          "To create a new notification, use the format `<prefix> notification create <channel> <frequency> <content>`. The `channel` value should be a `#channel` mention, the frequency is a number in minutes (i.e. `10`), and the content is your notification text. Discord markdown is supported!",
      },
      {
        name: "View current notifications",
        value:
          "To view your server's existing notifications, use `<prefix> notification view` to get a list. Each notification has a number, and you can use `<prefix> notification view <number>` to see the detailed information for that notification.",
      },
      {
        name: "Delete a notification",
        value:
          "To delete a notification, use `<prefix> notification delete <number>` where `number` is the number of the notification you would like to delete.",
      },
      {
        name: "Update a notification",
        value:
          "This feature is coming soon! For now, you'll need to delete the existing notification and create a new one.",
      },
    ]);

    await message.channel.send({ embeds: [helpEmbed] });
  } catch (error) {
    errorHandler("notification help", error);
  }
};
