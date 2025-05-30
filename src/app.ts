import { Bot } from "@/bot";
import {
    ErrorHandler,
    AdminGuard,
    Session,
    ConversationOrchestrator,
} from "@/modules";
import {
    ConfirmQuoteScene,
    IntroScene,
    QuoteScenesBuilder,
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
            new QuoteScenesBuilder("text"),
            new QuoteScenesBuilder("author"),
            new QuoteScenesBuilder("origin"),
            new ConfirmQuoteScene(),
        ),
    );
    bot.init();
};

bootstrap();
