import { conversationIDs } from "@/constants";
import { quoteDecisionKeyboard } from "@/keyboards";
import { BaseScene } from "@/scenes/base-scene";
import type { BotContext } from "@/types/models";
import { formatQuoteHtml } from "@/utils/format-quote-html";
import {
    type Conversation,
    type ConversationFlavor,
    createConversation,
} from "@grammyjs/conversations";
import type { Context, MiddlewareFn } from "grammy";
import { cacheMessageInSession } from "@/utils/cached-message";

const quoteDecisionConversation = async (
    conversation: Conversation,
    ctx: Context,
) => {
    const session = await conversation.external(
        (ctx: BotContext) => ctx.session,
    );
    await cacheMessageInSession(
        conversation,
        await ctx.reply(formatQuoteHtml(session), {
            parse_mode: "HTML",
            reply_markup: quoteDecisionKeyboard,
        }),
    );
    await conversation.halt();
};

export class QuoteDecisionScene extends BaseScene {
    static getName(): string {
        return conversationIDs.CONFIRMATION;
    }

    getMiddleware(): MiddlewareFn<ConversationFlavor<Context>> {
        return createConversation(quoteDecisionConversation, {
            id: conversationIDs.CONFIRMATION,
            parallel: true,
        });
    }
}
