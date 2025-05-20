import type { BotContext, FrameworkBot } from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import { type Context, InlineKeyboard, type MiddlewareFn } from "grammy";
import { BaseScene } from "./base-scene";
import { WELCOME_TEXT, START_BUTTON_TEXT } from "public/messages.json";
import { RequestQuoteTextScene } from "./request-quote-text-scene";

const CALLBACK_DATA = "start-creation";

const introConversation = async (__: Conversation, ctx: Context) => {
    await ctx.reply(WELCOME_TEXT, {
        reply_markup: new InlineKeyboard().text(
            START_BUTTON_TEXT,
            CALLBACK_DATA,
        ),
    });
};

export class IntroScene extends BaseScene {
    static getName(): string {
        return introConversation.name;
    }

    getMiddleware(): MiddlewareFn<BotContext> {
        return createConversation(introConversation);
    }

    apply(bot: FrameworkBot): void {
        bot.command("start", async (ctx) => {
            await ctx.conversation.enter(IntroScene.getName());
        });
        bot.callbackQuery(CALLBACK_DATA, async (ctx) => {
            await ctx.conversation.enter(RequestQuoteTextScene.getName());
        });
    }
}
