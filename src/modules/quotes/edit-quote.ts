import type { BotModule, FrameworkBot } from "@/types/models";
import { actionPayloads, conversationIDs } from "@/constants";
import { quoteDecisionKeyboard, quoteEditOptionsKeyboard } from "@/keyboards";
import { updateCachedSessionMessage } from "@/utils/cached-message";
import type { InlineKeyboard } from "grammy";

const payloadToSceneMap: [string, string][] = [
    [actionPayloads.EDIT_QUOTE_TEXT, conversationIDs.TEXT_REQUEST],
    [actionPayloads.EDIT_QUOTE_AUTHOR, conversationIDs.AUTHOR_REQUEST],
    [actionPayloads.EDIT_QUOTE_ORIGIN, conversationIDs.ORIGIN_REQUEST],
];

export class EditQuote implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.callbackQuery(
            [actionPayloads.EDIT_QUOTE_CREATION, actionPayloads.CANCEL_EDIT],
            async (ctx) => {
                const replyMarkup: InlineKeyboard =
                    ctx.callbackQuery.data === actionPayloads.CANCEL_EDIT
                        ? quoteDecisionKeyboard
                        : quoteEditOptionsKeyboard;

                await updateCachedSessionMessage(ctx, {
                    replyMarkup,
                    parseMode: "HTML",
                });

                await ctx.answerCallbackQuery();
            },
        );

        for (const [payload, sceneId] of payloadToSceneMap) {
            bot.callbackQuery(payload, async (ctx) => {
                ctx.session.isEdit = true;
                await ctx.conversation.enter(sceneId);
                await ctx.answerCallbackQuery();
            });
        }
    }
}
