import { Bot as GrammyBot } from "grammy";
import { env } from "@/config/env";
import { conversations } from "@grammyjs/conversations";
import type { BotModule, FrameworkBot } from "@/types/models";

export class Bot {
    private readonly bot: FrameworkBot;

    constructor(...modules: BotModule[]) {
        this.bot = new GrammyBot(env.BOT_TOKEN);
        this.bot.use(conversations());
        for (const module of modules) {
            module.apply(this.bot);
        }
    }

    init(): void {
        this.bot.start();
    }
}
