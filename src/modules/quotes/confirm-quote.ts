import { env } from "@/config/env";
import { actionPayloads, conversationIDs } from "@/constants";
import type { BotModule, FrameworkBot } from "@/types/models";
import { formatQuoteHtml } from "@/utils/format-quote-html";
import { statuses } from "public/messages.json";
import { updateCachedSessionMessage } from "@/utils/cached-message";

export class ConfirmQuote implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.callbackQuery(
            actionPayloads.CONFIRM_QUOTE_CREATION,
            async (ctx) => {
                await updateCachedSessionMessage(ctx, {
                    messageText: statuses.QUOTE_POSTING,
                });

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
                    await updateCachedSessionMessage(ctx, {
                        messageText: statuses.QUOTE_SUCCESS,
                    });
                    await ctx.reply(statuses.QUOTE_REFERENCE, {
                        reply_parameters: {
                            message_id,
                            chat_id: id,
                        },
                    });
                } catch (e) {
                    await ctx.conversation.enter(conversationIDs.CONFIRMATION);
                } finally {
                    await ctx.answerCallbackQuery();
                }
            },
        );
    }
}
