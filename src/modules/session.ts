import type { BotModule, FrameworkBot, SessionData } from "@/types/models";
import { session } from "grammy";

const initial = (): SessionData => ({
    text: "",
    author: "",
    origin: "",
    isEdit: false,
});

export class Session implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.use(session({ initial }));
    }
}
