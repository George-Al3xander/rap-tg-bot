import type { MiddlewareFn } from "grammy";
import type { BotContext, BotModule, FrameworkBot } from "@/types/models";

export abstract class BaseScene implements BotModule {
    abstract apply(bot: FrameworkBot): void;

    abstract getMiddleware(): MiddlewareFn<BotContext>;

    static getName(): string {
        throw new Error(`getName() not implemented in ${this.name}`);
    }
}
