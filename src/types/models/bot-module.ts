import type { FrameworkBot } from "./framework-bot";

export type BotModule = {
    apply(bot: FrameworkBot): void;
};
