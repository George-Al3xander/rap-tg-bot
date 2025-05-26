import { conversationIDs } from "@/constants";
import type { BotContext, Quote } from "@/types/models";
import {
    type Conversation,
    type ConversationFlavor,
    createConversation,
} from "@grammyjs/conversations";
import type { Context, MiddlewareFn } from "grammy";
import { prompts } from "public/messages.json";
import { BaseScene } from "./base-scene";

const QUOTE_METADATA: Record<keyof Quote, { messageText: string; id: string }> =
    {
        text: {
            messageText: prompts.QUOTE_TEXT,
            id: conversationIDs.TEXT_REQUEST,
        },
        author: {
            messageText: prompts.QUOTE_AUTHOR,
            id: conversationIDs.AUTHOR_REQUEST,
        },
        origin: {
            messageText: prompts.QUOTE_ORIGIN,
            id: conversationIDs.ORIGIN_REQUEST,
        },
    };

const requestConversation =
    ({
        quoteField,
        messageText,
    }: { quoteField: keyof Quote; messageText: string }) =>
    async (conversation: Conversation, ctx: Context) => {
        await ctx.reply(messageText);
        const { message } = await conversation.waitFor("message:text");

        const session = await conversation.external(
            (ctx: BotContext) => ctx.session,
        );
        session[quoteField] = message.text;
        await conversation.external((ctx: BotContext) => {
            ctx.session = session;
        });

        await conversation.halt();
    };

export class QuoteScenesBuilder extends BaseScene {
    private readonly quoteFieldKey: keyof Quote;

    constructor(k: keyof Quote) {
        super();
        this.quoteFieldKey = k;
    }

    getMiddleware(): MiddlewareFn<ConversationFlavor<Context>> {
        const { messageText, id } = QUOTE_METADATA[this.quoteFieldKey];
        return createConversation(
            requestConversation({
                quoteField: this.quoteFieldKey,
                messageText,
            }),
            {
                id,
                parallel: true,
            },
        );
    }
}
