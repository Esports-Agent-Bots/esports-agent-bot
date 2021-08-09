import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { Client } from "discord.js";
import { logHandler } from "./helpers/logHandler";
import { onReady } from "./events/onReady";
import { onMessage } from "./events/onMessage";
import { Esports } from "./interfaces/EsportsInt";
import { IntentOptions } from "./config/IntentOptions";

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

if (!token) {
  logHandler.log("error", "Missing token!");
  process.exit(1);
}

const BOT: Esports = new Client({ intents: IntentOptions }) as Esports;

BOT.notifications = [];
BOT.intervals = [];

BOT.on("ready", () => onReady(BOT));

BOT.on("message", (message) => onMessage(message, BOT));

BOT.login(token);
