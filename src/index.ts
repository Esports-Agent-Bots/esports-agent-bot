import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { Client } from "discord.js";
import { logHandler } from "./helpers/logHandler";
import { onReady } from "./events/onReady";
import { onMessage } from "./events/onMessage";
import { NotificationInt } from "./database/NotificationModel";
import { IntervalsInt } from "./interfaces/IntervalsInt";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

const token = process.env.DISCORD_TOKEN;

const notificationCollection: { [key: number]: NotificationInt } = {};

const intervalCollection: IntervalsInt = {};

if (!token) {
  logHandler.log("error", "Missing token!");
  process.exit(1);
}

const BOT = new Client();

BOT.on("ready", () => onReady(notificationCollection, intervalCollection, BOT));

BOT.on("message", (message) =>
  onMessage(message, notificationCollection, intervalCollection, BOT)
);

BOT.login(token);
