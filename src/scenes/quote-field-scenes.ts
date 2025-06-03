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
import { updateCachedSessionMessage } from "@/utils/cached-message";

export const QUOTE_FIELD_PROMPTS: Record<
    keyof Quote,
    { messageText: string; id: string }
> = {
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

const requestFieldConversation =
    ({
        quoteField,
        messageText,
    }: { quoteField: keyof Quote; messageText: string }) =>
    async (conversation: Conversation) => {
        await updateCachedSessionMessage(conversation, {
            messageText,
        });

        const {
            message: { text },
        } = await conversation.waitFor("message:text");

        await conversation.external((externalCtx: BotContext) => {
            externalCtx.session[quoteField] = text;
            externalCtx.session.cachedMessage = null;
        });

        await conversation.halt();
    };

class QuoteFieldScene extends BaseScene {
    private readonly quoteFieldKey: keyof Quote;

    constructor(k: keyof Quote) {
        super();
        this.quoteFieldKey = k;
    }

    getMiddleware(): MiddlewareFn<ConversationFlavor<Context>> {
        const { messageText, id } = QUOTE_FIELD_PROMPTS[this.quoteFieldKey];
        return createConversation(
            requestFieldConversation({
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

export class QuoteFieldScenes {
    private scenes: Map<keyof Quote, QuoteFieldScene>;

    constructor() {
        this.scenes = new Map();
        for (const key of Object.keys(QUOTE_FIELD_PROMPTS) as (keyof Quote)[]) {
            this.scenes.set(key, new QuoteFieldScene(key));
        }
    }

    *[Symbol.iterator]() {
        yield* this.scenes.values();
    }
}
