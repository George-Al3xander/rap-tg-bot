import type { BotModule, FrameworkBot } from "@/types/models";
import { actionPayloads, conversationIDs } from "@/constants";
import { quoteEditOptionsKeyboard } from "@/keyboards";
import { updateCachedSessionMessage } from "@/utils/cached-message";

const payloadToSceneMap: [string, string][] = [
    [actionPayloads.EDIT_QUOTE_TEXT, conversationIDs.TEXT_REQUEST],
    [actionPayloads.EDIT_QUOTE_AUTHOR, conversationIDs.AUTHOR_REQUEST],
    [actionPayloads.EDIT_QUOTE_ORIGIN, conversationIDs.ORIGIN_REQUEST],
    [actionPayloads.CANCEL_EDIT, conversationIDs.CONFIRMATION],
];

export class EditQuote implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.callbackQuery(actionPayloads.EDIT_QUOTE_CREATION, async (ctx) => {
            await updateCachedSessionMessage(ctx, {
                replyMarkup: quoteEditOptionsKeyboard,
                parseMode: "HTML",
            });
            await ctx.answerCallbackQuery();
        });

        for (const [payload, sceneId] of payloadToSceneMap) {
            bot.callbackQuery(payload, async (ctx) => {
                if (actionPayloads.CANCEL_EDIT !== payload)
                    ctx.session.isEdit = true;
                await ctx.conversation.enter(sceneId);
                await ctx.answerCallbackQuery();
            });
        }
    }
}
