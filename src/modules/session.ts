import type { BotModule, FrameworkBot } from "@/types/models";
import type { SessionData } from "@/types/models/session-data";
import { session } from "grammy";

const initial = (): SessionData => ({
    text: "",
    author: "",
    origin: "",
});

export class Session implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(session({ initial }));
    }
}
