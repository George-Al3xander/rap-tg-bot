import type { Context, MiddlewareFn } from "grammy";
import type { ConversationFlavor } from "@grammyjs/conversations";
import type { BotModule, FrameworkBot } from "@/types/models";

export abstract class BaseScene implements BotModule {
    public apply(bot: FrameworkBot): void {}

    abstract getMiddleware(): MiddlewareFn<ConversationFlavor<Context>>;
}
