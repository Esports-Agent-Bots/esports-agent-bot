import { Document, model, Schema } from "mongoose";

export interface NotificationInt extends Document {
  number: number;
  channelId: string;
  frequency: number;
  content: string;
}

export const Notification = new Schema({
  number: Number,
  channelId: String,
  frequency: Number,
  content: String,
});

export default model<NotificationInt>("notification", Notification);
