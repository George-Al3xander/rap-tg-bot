import { Bot } from "@/bot";
import {
    AdminGuard,
    ConversationOrchestrator,
    ErrorHandler,
    Session,
} from "@/modules";
import {
    ConfirmQuoteScene,
    IntroScene,
    QuoteFieldScenes,
    SceneComposer,
} from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new Session(),
        new ConversationOrchestrator(),
        new SceneComposer(
            new IntroScene(),
            ...new QuoteFieldScenes(),
            new ConfirmQuoteScene(),
        ),
    );
    bot.init();
};

bootstrap();
