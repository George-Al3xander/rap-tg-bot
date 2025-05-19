import type { Context, MiddlewareFn } from "grammy";
import type { ConversationFlavor } from "@grammyjs/conversations";
import type { BotModule, FrameworkBot } from "@/types/models";

export abstract class BaseScene implements BotModule {
    abstract apply(bot: FrameworkBot): void;

    abstract getMiddleware(): MiddlewareFn<ConversationFlavor<Context>>;

    static getName(): string {
        throw new Error(`getName() not implemented in ${this.name}`);
    }
}
