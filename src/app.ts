import { Bot } from "@/bot";
import { ErrorHandler, AdminGuard, Session } from "@/modules";
import { SceneComposer, IntroScene, RequestQuoteTextScene } from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new Session(),
        new SceneComposer(new IntroScene(), new RequestQuoteTextScene()),
    );
    bot.init();
};

bootstrap();
