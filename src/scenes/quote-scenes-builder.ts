import type {
    BotContext,
    BotModule,
    FrameworkBot,
    SessionData,
} from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import type { Context } from "grammy";
import {
    ASK_FOR_TEXT,
    ASK_FOR_AUTHOR_TEXT,
    ASK_FOR_ORIGIN_TEXT,
} from "public/messages.json";
import {
    AUTHOR_REQUEST_ID,
    ORIGIN_REQUEST_ID,
    TEXT_REQUEST_ID,
} from "@/constants";

const QUOTE_FIELDS: (keyof SessionData)[] = ["text", "author", "origin"];

const QUOTE_METADATA: Record<
    keyof SessionData,
    { messageText: string; id: string }
> = {
    text: { messageText: ASK_FOR_TEXT, id: TEXT_REQUEST_ID },
    author: {
        messageText: ASK_FOR_AUTHOR_TEXT,
        id: AUTHOR_REQUEST_ID,
    },
    origin: {
        messageText: ASK_FOR_ORIGIN_TEXT,
        id: ORIGIN_REQUEST_ID,
    },
};

const requestConversation =
    ({
        quoteField,
        messageText,
    }: { quoteField: keyof SessionData; messageText: string }) =>
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

export class QuoteScenesBuilder implements BotModule {
    apply(bot: FrameworkBot): void {
        for (const f of QUOTE_FIELDS.reverse()) {
            const { messageText, id } = QUOTE_METADATA[f];

            bot.use(
                createConversation(
                    requestConversation({
                        quoteField: f,
                        messageText,
                    }),
                    {
                        id,
                        parallel: true,
                    },
                ),
            );
        }
    }
}
