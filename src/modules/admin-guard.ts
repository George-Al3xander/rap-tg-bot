import type { BotModule, FrameworkBot } from "@/types/models";
import { env } from "@/config/env";
import type { Context, NextFunction } from "grammy";
import { errors } from "public/messages.json";

const adminIDs = env.ADMIN_IDS.split("/").map((id) => id.trim());

const adminMiddleware = async (
    ctx: Context,
    next: NextFunction,
): Promise<void> => {
    const { id } = await ctx.getChat();

    if (id && id > 0) {
        if (adminIDs.includes(id.toString())) {
            return await next();
        }
        await ctx.reply(errors.UNAUTHORIZED, { parse_mode: "HTML" });
    }
};

export class AdminGuard implements BotModule {
    async apply(bot: FrameworkBot): Promise<void> {
        bot.use(adminMiddleware);
    }
}
