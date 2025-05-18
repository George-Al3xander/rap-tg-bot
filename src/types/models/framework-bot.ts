import type { Bot, Context } from "grammy";
import type { ConversationFlavor } from "@grammyjs/conversations";

export type FrameworkBot = Bot<ConversationFlavor<Context>>;
