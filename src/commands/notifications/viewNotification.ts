import { Message, MessageEmbed } from "discord.js";
import { NotificationInt } from "../../database/NotificationModel";
import { customSubstring } from "../../helpers/customSubstring";
import { errorHandler } from "../../helpers/errorHandler";

export const viewNotification = async (
  message: Message,
  notifs: { [key: number]: NotificationInt }
): Promise<void> => {
  try {
    const [, , , number] = message.content.split(" ");

    if (!message.guild) {
      await message.reply("Sorry, but an unknown guild error has occurred.");
      return;
    }

    if (number) {
      const target = notifs[parseInt(number, 10)];

      if (!target) {
        await message.reply(`Sorry, but I could not find that notification`);
        return;
      }

      if (message.guild.id !== target.id) {
        await message.reply(
          `Sorry, but that notification does not belong to you!`
        );
        return;
      }

      const notificationEmbed = new MessageEmbed();

      notificationEmbed.setTitle(`Notification #${number}`);
      notificationEmbed.addFields([
        {
          name: "Notification Channel",
          value: `<#${target.channelId}>`,
        },
        {
          name: "Frequency",
          value: `${target.frequency} minutes`,
        },
        {
          name: "Content",
          value: customSubstring(target.content, 1000),
        },
      ]);

      await message.channel.send(notificationEmbed);
      return;
    }

    const notificationList = Object.values(notifs)
      .filter((el) => el.guildId === message.guild?.id)
      .map(
        (el) =>
          `#${el.number} - <#${el.channelId}> - ${customSubstring(
            el.content,
            20
          )}`
      )
      .join(`\n`);

    if (!notificationList) {
      await message.reply("You have no notifications set at this time!");
      return;
    }

    await message.channel.send(customSubstring(notificationList, 2000));
  } catch (error) {
    errorHandler("view notification", error);
  }
};
