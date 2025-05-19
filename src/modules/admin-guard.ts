import type { BotModule, FrameworkBot } from "@/types/models";
import { env } from "@/config/env";
import type { Context, NextFunction } from "grammy";

const adminIDs = env.ADMIN_IDS.split("/").map((id) => id.trim());

const adminMiddleware = async (
    ctx: Context,
    next: NextFunction,
): Promise<void> => {
    let chatId: number | null = null;

    try {
        const chat = await ctx.getChat();
        chatId = chat.id;
    } catch {
        chatId = null;
    }

    if (chatId && chatId > 0) {
        if (adminIDs.includes(chatId.toString())) {
            return await next();
        }
        await ctx.reply(
            "<b>Unauthorized Access 🔐</b>\n\nYou are not allowed to use this bot.",
            { parse_mode: "HTML" },
        );
    }
};

export class AdminGuard implements BotModule {
    async apply(bot: FrameworkBot): Promise<void> {
        bot.use(adminMiddleware);
    }
}
