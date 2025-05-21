import type { BotContext, BotModule, FrameworkBot } from "@/types/models";
import { conversations } from "@grammyjs/conversations";
import {
    AUTHOR_REQUEST_ID,
    ORIGIN_REQUEST_ID,
    TEXT_REQUEST_ID,
} from "@/constants";
import { formatQuoteHtml } from "@/utils/format-quote-html";

const SCENE_FLOW = [TEXT_REQUEST_ID, AUTHOR_REQUEST_ID, ORIGIN_REQUEST_ID];

export class ConversationOrchestrator implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(
            conversations({
                async onExit(currId, ctx: BotContext) {
                    const currentIndex = SCENE_FLOW.indexOf(currId);
                    const nextSceneId = SCENE_FLOW[currentIndex + 1] ?? null;
                    if (nextSceneId) {
                        await ctx.conversation.enter(nextSceneId);
                    } else {
                        await ctx.reply(formatQuoteHtml(ctx.session), {
                            parse_mode: "HTML",
                        });
                    }
                },
            }),
        );
    }
}
