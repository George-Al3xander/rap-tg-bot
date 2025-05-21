import type { BotModule, FrameworkBot } from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import { type Context, InlineKeyboard } from "grammy";
import { WELCOME_TEXT, START_BUTTON_TEXT } from "public/messages.json";
import { TEXT_REQUEST_ID } from "@/constants";

const CALLBACK_DATA = "start-creation";
const INTRO_CONVERSATION_ID = "intro-conversation";

const introConversation = async (__: Conversation, ctx: Context) => {
    await ctx.reply(WELCOME_TEXT, {
        reply_markup: new InlineKeyboard().text(
            START_BUTTON_TEXT,
            CALLBACK_DATA,
        ),
    });
};

export class IntroScene implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(
            createConversation(introConversation, {
                id: INTRO_CONVERSATION_ID,
            }),
        );
        bot.command("start", async (ctx) => {
            await ctx.conversation.enter(INTRO_CONVERSATION_ID);
        });
        bot.callbackQuery(CALLBACK_DATA, async (ctx) => {
            await ctx.conversation.enter(TEXT_REQUEST_ID);
        });
    }
}
