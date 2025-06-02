import type { BotContext, BotModule, FrameworkBot } from "@/types/models";
import { conversations } from "@grammyjs/conversations";
import { conversationIDs } from "@/constants";

const SCENE_FLOW = [
    conversationIDs.TEXT_REQUEST,
    conversationIDs.AUTHOR_REQUEST,
    conversationIDs.ORIGIN_REQUEST,
];

export class ConversationOrchestrator implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(
            conversations({
                async onExit(currId, ctx: BotContext) {
                    const currentIndex = SCENE_FLOW.indexOf(
                        currId as (typeof SCENE_FLOW)[number],
                    );
                    const nextSceneId = SCENE_FLOW[currentIndex + 1] ?? null;
                    const isEdit = ctx.session.isEdit;
                    if (nextSceneId && !isEdit) {
                        await ctx.conversation.enter(nextSceneId);
                    } else {
                        await ctx.conversation.enter(
                            conversationIDs.CONFIRMATION,
                        );
                    }
                    ctx.session.isEdit = false;
                },
            }),
        );
    }
}
