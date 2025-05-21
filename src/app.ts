import { Bot } from "@/bot";
import {
    ErrorHandler,
    AdminGuard,
    Session,
    ConversationOrchestrator,
} from "@/modules";
import { IntroScene } from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new Session(),
        new ConversationOrchestrator(),
        new IntroScene(),
    );
    bot.init();
};

bootstrap();
