import { Bot as GrammyBot, webhookCallback } from "grammy";
import { env } from "@/config/env";
import type { BotModule, FrameworkBot } from "@/types/models";
import { logger } from "@/logger";
import express, { type Express } from "express";
import crypto from "node:crypto";

const SECRET_TOKEN = crypto.randomBytes(64).toString("hex");

export class Bot {
    private readonly bot: FrameworkBot;
    private readonly app: Express;

    constructor(...modules: BotModule[]) {
        this.bot = new GrammyBot(env.BOT_TOKEN);
        for (const module of modules) {
            module.apply(this.bot);
        }
        this.app = express();
        this.app.use(express.json());
        this.app.use(
            `/${env.BOT_TOKEN}`,
            webhookCallback(this.bot, "express", {
                secretToken: SECRET_TOKEN,
            }),
        );
    }

    init(): void {
        this.bot.api
            .setWebhook(`${env.HOST_URL}/${env.BOT_TOKEN}`, {
                secret_token: SECRET_TOKEN,
            })
            .then(() =>
                logger.info(`Bot successfully launched at: ${env.HOST_URL}`),
            )
            .catch((e) => logger.error(e, "Failed to launch bot."));
        this.app.listen(env.PORT, () => {
            logger.info(`Bot launched and listening on port ${env.PORT}.`);
        });
    }
}
