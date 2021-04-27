import { Message, MessageEmbed } from "discord.js";
import { NotificationInt } from "../../database/NotificationModel";
import { customSubstring } from "../../helpers/customSubstring";
import { errorHandler } from "../../helpers/errorHandler";

export const viewNotification = async (
  message: Message,
  notifs: { [key: number]: NotificationInt }
) => {
  try {
    const [, , , number] = message.content.split(" ");

    console.log(number);

    if (number) {
      const target = notifs[parseInt(number, 10)];

      if (!target) {
        await message.reply(`Sorry, but I could not find that notification`);
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
      .map(
        (el) =>
          `#${el.number} - <#${el.channelId}> - ${customSubstring(
            el.content,
            20
          )}`
      )
      .join(`\n`);

    await message.channel.send(customSubstring(notificationList, 2000));
  } catch (error) {
    errorHandler("view notification", error);
  }
};
