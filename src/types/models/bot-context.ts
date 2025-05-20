import type { ConversationFlavor } from "@grammyjs/conversations";
import type { Context, SessionFlavor } from "grammy";
import type { SessionData } from "./session-data";

export type BotContext = ConversationFlavor<Context> &
    SessionFlavor<SessionData>;
