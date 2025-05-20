import type { BotContext, FrameworkBot } from "@/types/models";
import { BaseScene } from "@/scenes/index";
import type { Context, MiddlewareFn } from "grammy";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import { ASK_FOR_TEXT } from "public/messages.json";

const textConversation = async (conversation: Conversation, ctx: Context) => {
    await ctx.reply(ASK_FOR_TEXT);
    const { message } = await conversation.waitFor("message:text");
    (ctx as BotContext).session.text = message.text;
};

export class RequestQuoteTextScene extends BaseScene {
    static getName(): string {
        return textConversation.name;
    }

    getMiddleware(): MiddlewareFn<BotContext> {
        return createConversation(textConversation);
    }

    apply(bot: FrameworkBot): void {}
}
