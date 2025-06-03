import type { BotModule, FrameworkBot } from "@/types/models";
import { actionPayloads, conversationIDs } from "@/constants";
import { deleteCachedSessionMessage } from "@/utils/cached-message";

export class CancelQuote implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.callbackQuery(actionPayloads.CANCEL_QUOTE_CREATION, async (ctx) => {
            await deleteCachedSessionMessage(ctx);
            await ctx.conversation.enter(conversationIDs.INTRO);
            await ctx.answerCallbackQuery();
        });
    }
}
