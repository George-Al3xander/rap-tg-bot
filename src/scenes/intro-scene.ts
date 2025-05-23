import type { BotModule, FrameworkBot } from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import { type Context, InlineKeyboard } from "grammy";
import { buttons, welcome } from "public/messages.json";
import { actionPayloads, conversationIDs } from "@/constants";

const introConversation = async (__: Conversation, ctx: Context) => {
    await ctx.reply(welcome.TEXT, {
        reply_markup: new InlineKeyboard().text(
            buttons.START,
            actionPayloads.START_QUOTE_CREATION,
        ),
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
