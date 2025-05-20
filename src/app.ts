import { Bot } from "@/bot";
import { ErrorHandler, AdminGuard, Session } from "@/modules";
import { SceneComposer, IntroScene } from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new Session(),
        new SceneComposer(new IntroScene()),
    );
    bot.init();
};

bootstrap();
