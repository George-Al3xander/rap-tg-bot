import type {
    BotContext,
    BotModule,
    FrameworkBot,
    SessionData,
} from "@/types/models";
import { type Conversation, createConversation } from "@grammyjs/conversations";
import type { Context } from "grammy";
import { prompts } from "public/messages.json";
import { conversationIDs } from "@/constants";

const QUOTE_FIELDS: (keyof SessionData)[] = ["text", "author", "origin"];

const QUOTE_METADATA: Record<
    keyof SessionData,
    { messageText: string; id: string }
> = {
    text: { messageText: prompts.QUOTE_TEXT, id: conversationIDs.TEXT_REQUEST },
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
