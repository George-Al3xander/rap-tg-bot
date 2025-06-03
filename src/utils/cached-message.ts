import type { BotContext, SessionData } from "@/types/models";
import type { Conversation } from "@grammyjs/conversations";
import type { InlineKeyboard } from "grammy";

const withContext = async (
    source: BotContext | Conversation,
    handler: (ctx: BotContext) => Promise<void> | void,
) => {
    if ("external" in source) {
        await source.external(handler);
    } else {
        await handler(source);
    }
};

export const cacheMessageInSession = async (
    source: BotContext | Conversation,
    message: BotContext["msg"],
) => {
    if (!message) return;

    const newMessage = { id: message.message_id, chatId: message.chat.id };
    await withContext(source, (ctx) => {
        ctx.session.cachedMessage = newMessage;
    });
};

export const deleteCachedSessionMessage = async (
    source: BotContext | Conversation,
) => {
    await withContext(source, async (ctx) => {
        const msg = ctx.session.cachedMessage;
        if (msg) {
            await ctx.api.deleteMessage(msg.chatId, msg.id);
        }
    });
};

export const getCachedSessionMessage = async (
    source: BotContext | Conversation,
): Promise<SessionData["cachedMessage"] | null> => {
    let cachedMessage: SessionData["cachedMessage"] | null = null;
    await withContext(source, (ctx) => {
        cachedMessage = ctx.session.cachedMessage || null;
    });
    return cachedMessage;
};

export const updateCachedSessionMessage = async (
    source: BotContext | Conversation,
    {
        messageText,
        replyMarkup,
        parseMode,
    }: {
        messageText?: string;
        replyMarkup?: InlineKeyboard;
        parseMode?: NonNullable<
            Parameters<NonNullable<BotContext["reply"]>>[1]
        >["parse_mode"];
    },
) => {
    await withContext(source, async (ctx) => {
        const msg = ctx.session.cachedMessage;

        if (msg) {
            if (messageText) {
                await ctx.api.editMessageText(msg.chatId, msg.id, messageText, {
                    reply_markup: replyMarkup,
                    parse_mode: parseMode,
                });
            } else if (replyMarkup) {
                await ctx.api.editMessageReplyMarkup(msg.chatId, msg.id, {
                    reply_markup: replyMarkup,
                });
            }
        } else if (messageText) {
            await ctx.reply(messageText, {
                reply_markup: replyMarkup,
                parse_mode: parseMode,
            });
        }
    });
};
