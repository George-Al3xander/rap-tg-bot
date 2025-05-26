import type { BotModule, FrameworkBot } from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import type { Context } from "grammy";
import { welcome } from "public/messages.json";
import { actionPayloads, conversationIDs } from "@/constants";
import { startQuoteCreationKeyboard } from "@/keyboards";

const introConversation = async (__: Conversation, ctx: Context) => {
    await ctx.reply(welcome.TEXT, {
        reply_markup: startQuoteCreationKeyboard,
    });
};

export class IntroScene implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(
            createConversation(introConversation, {
                id: conversationIDs.INTRO,
            }),
        );
        bot.command("start", async (ctx) => {
            await ctx.conversation.enter(conversationIDs.INTRO);
        });
        bot.callbackQuery(actionPayloads.START_QUOTE_CREATION, async (ctx) => {
            await ctx.conversation.enter(conversationIDs.TEXT_REQUEST);
        });
    }
}
