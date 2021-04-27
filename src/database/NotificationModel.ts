import { Document, model, Schema } from "mongoose";

export interface NotificationInt extends Document {
  number: number;
  channelId: string;
  content: string;
}

export const Notification = new Schema({
  number: Number,
  channelId: String,
  content: String,
});

export default model<NotificationInt>("notification", Notification);
