import { Bot as GrammyBot } from "grammy";
import { env } from "@/config/env";
import { conversations } from "@grammyjs/conversations";
import type { BotModule, FrameworkBot } from "@/types/models";
import { logger } from "@/logger";

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
        try {
            this.bot.start();
            logger.info("Bot launched successfully.");
        } catch (e) {
            logger.error(e, "Failed to launch bot.");
        }
    }
}
