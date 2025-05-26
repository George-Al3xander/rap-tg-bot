import type { BotContext, FrameworkBot } from "@/types/models";
import {
    type Conversation,
    type ConversationFlavor,
    createConversation,
} from "@grammyjs/conversations";
import type { Context, MiddlewareFn } from "grammy";
import { formatQuoteHtml } from "@/utils/format-quote-html";
import { statuses } from "public/messages.json";
import { env } from "@/config/env";
import { conversationIDs, actionPayloads } from "@/constants";
import { quoteDecisionKeyboard, quoteEditOptionsKeyboard } from "@/keyboards";
import { BaseScene } from "@/scenes/base-scene";

let msg: Context["msg"] | null = null;

const payloadToSceneMap: [string, string][] = [
    [actionPayloads.EDIT_QUOTE_TEXT, conversationIDs.TEXT_REQUEST],
    [actionPayloads.EDIT_QUOTE_AUTHOR, conversationIDs.AUTHOR_REQUEST],
    [actionPayloads.EDIT_QUOTE_ORIGIN, conversationIDs.ORIGIN_REQUEST],
    [actionPayloads.CANCEL_EDIT, conversationIDs.CONFIRMATION],
];

const confirmQuoteConversation = async (
    conversation: Conversation,
    ctx: Context,
) => {
    const session = await conversation.external(
        (ctx: BotContext) => ctx.session,
    );
    msg = await ctx.reply(formatQuoteHtml(session), {
        parse_mode: "HTML",
        reply_markup: quoteDecisionKeyboard,
    });
    await conversation.halt();
};

export class ConfirmQuoteScene extends BaseScene {
    static getName(): string {
        return conversationIDs.CONFIRMATION;
    }

    getMiddleware(): MiddlewareFn<ConversationFlavor<Context>> {
        return createConversation(confirmQuoteConversation, {
            id: conversationIDs.CONFIRMATION,
            parallel: true,
        });
    }

    apply(bot: FrameworkBot): void {
        bot.callbackQuery(
            actionPayloads.CONFIRM_QUOTE_CREATION,
            async (ctx) => {
                if (msg) {
                    await ctx.api.editMessageText(
                        msg.chat.id,
                        msg.message_id,
                        statuses.QUOTE_POSTING,
                    );
                } else {
                    msg = await ctx.reply(statuses.QUOTE_POSTING);
                }

                try {
                    const {
                        message_id,
                        chat: { id },
                    } = await bot.api.sendMessage(
                        env.GROUP_ID,
                        formatQuoteHtml(ctx.session),
                        {
                            parse_mode: "HTML",
                        },
                    );
                    await ctx.api.editMessageText(
                        msg.chat.id,
                        msg.message_id,
                        statuses.QUOTE_SUCCESS,
                    );
                    await ctx.reply(statuses.QUOTE_REFERENCE, {
                        reply_parameters: {
                            message_id,
                            chat_id: id,
                        },
                    });
                } catch (e) {
                    await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
                    msg = await ctx.reply(formatQuoteHtml(ctx.session), {
                        parse_mode: "HTML",
                        reply_markup: quoteDecisionKeyboard,
                    });
                }
            },
        );

        bot.callbackQuery(actionPayloads.CANCEL_QUOTE_CREATION, async (ctx) => {
            if (msg) {
                await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
            }

            await ctx.conversation.enter(conversationIDs.INTRO);
        });

        bot.callbackQuery(actionPayloads.EDIT_QUOTE_CREATION, async (ctx) => {
            if (msg) {
                await ctx.api.editMessageReplyMarkup(
                    msg.chat.id,
                    msg.message_id,
                    {
                        reply_markup: quoteEditOptionsKeyboard,
                    },
                );
            } else {
                msg = await ctx.reply(formatQuoteHtml(ctx.session), {
                    reply_markup: quoteEditOptionsKeyboard,
                });
            }
        });

        for (const [payload, sceneId] of payloadToSceneMap) {
            bot.callbackQuery(payload, async (ctx) => {
                await ctx.answerCallbackQuery();
                if (msg) {
                    await ctx.api.deleteMessage(msg.chat.id, msg.message_id);
                }
                if (actionPayloads.CANCEL_EDIT !== payload)
                    ctx.session.isEdit = true;
                await ctx.conversation.enter(sceneId);
            });
        }
    }
}
