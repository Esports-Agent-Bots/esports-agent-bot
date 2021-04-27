import { Client, Message, MessageEmbed } from "discord.js";
import NotificationModel, {
  NotificationInt,
} from "../../database/NotificationModel";
import { customSubstring } from "../../helpers/customSubstring";
import { errorHandler } from "../../helpers/errorHandler";
import { scheduleReminder } from "../../helpers/scheduleReminder";
import { IntervalsInt } from "../../interfaces/IntervalsInt";

export const createNotification = async (
  message: Message,
  notifs: { [key: number]: NotificationInt },
  intervals: IntervalsInt,
  bot: Client
): Promise<void> => {
  try {
    const [
      prefix,
      command,
      action,
      rawChannel,
      rawTime,
    ] = message.content.split(" ");

    const guild = message.guild;

    if (!guild) {
      await message.reply(
        "An unknown guild error occurred. Please contact support."
      );
      return;
    }

    if (!/^<#\d*>$/.test(rawChannel)) {
      await message.reply("Sorry, but please use a correct channel mention.");
      return;
    }

    const time = parseInt(rawTime, 10);

    if (isNaN(time)) {
      await message.reply(
        "Sorry, but please use a number for the frequency (in minutes)."
      );
      return;
    }

    // get the id from the mention
    const channel = rawChannel.replace(/\D/g, "");

    const validChannel = message.guild?.channels.cache.get(channel);

    if (validChannel?.type !== "text") {
      await message.reply(
        "Sorry, but notifications can only be set on text channels."
      );
      return;
    }

    const sliceLength =
      [prefix, command, action, rawChannel, rawTime].join(" ").length + 1;

    const content = message.content.substring(sliceLength);

    if (!content) {
      await message.reply(
        "Sorry, but please provide the content for the notification!"
      );
    }

    const highestNum = Object.values(notifs)
      .map((el) => el.number)
      .sort((a, b) => b - a)[0];

    const newNumber = highestNum + 1 || 1;

    const newNotification = await NotificationModel.create({
      number: newNumber,
      channelId: channel,
      frequency: time,
      content: content,
      guildId: guild.id,
    });

    // cache it
    notifs[newNumber] = newNotification;

    const createdEmbed = new MessageEmbed();

    createdEmbed.setTitle("Notification created!");
    createdEmbed.setDescription("The following notification was created:");
    createdEmbed.addFields([
      {
        name: "Notification Channel",
        value: rawChannel,
      },
      {
        name: "Frequency",
        value: `${time} minutes`,
      },
      {
        name: "Content",
        value: customSubstring(content, 1000),
      },
    ]);

    scheduleReminder(newNotification, intervals, bot);

    await message.channel.send(createdEmbed);
  } catch (error) {
    errorHandler("create notification", error);
  }
};
