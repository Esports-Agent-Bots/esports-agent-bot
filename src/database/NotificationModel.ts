import { Document, model, Schema } from "mongoose";
import encrypt from "mongoose-encryption";
export interface NotificationInt extends Document {
  number: number;
  channelId: string;
  frequency: number;
  content: string;
  guildId: string;
  messageId: string;
}

export const Notification = new Schema({
  number: Number,
  channelId: String,
  frequency: Number,
  content: String,
  guildId: String,
  messageId: {
    type: String,
    default: "",
  },
});

const encryptionKey = process.env.ENCRYPTION_KEY;
const signingKey = process.env.SIGNING_KEY;

Notification.plugin(encrypt, {
  encryptionKey,
  signingKey,
  excludeFromEncryption: ["number"],
});

export default model<NotificationInt>("notification", Notification);
