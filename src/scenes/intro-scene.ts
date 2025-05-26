import type { FrameworkBot } from "@/types/models";
import {
    type Conversation,
    type ConversationFlavor,
    createConversation,
} from "@grammyjs/conversations";
import type { Context, MiddlewareFn } from "grammy";
import { welcome } from "public/messages.json";
import { actionPayloads, conversationIDs } from "@/constants";
import { startQuoteCreationKeyboard } from "@/keyboards";
import { BaseScene } from "@/scenes/base-scene";

const introConversation = async (__: Conversation, ctx: Context) => {
    await ctx.reply(welcome.TEXT, {
        reply_markup: startQuoteCreationKeyboard,
    });
};

export class IntroScene extends BaseScene {
    getMiddleware(): MiddlewareFn<ConversationFlavor<Context>> {
        return createConversation(introConversation, {
            id: conversationIDs.INTRO,
        });
    }

    apply(bot: FrameworkBot): void {
        bot.command("start", async (ctx) => {
            await ctx.conversation.enter(conversationIDs.INTRO);
        });
        bot.callbackQuery(actionPayloads.START_QUOTE_CREATION, async (ctx) => {
            await ctx.answerCallbackQuery();
            await ctx.conversation.enter(conversationIDs.TEXT_REQUEST);
        });
    }
}
