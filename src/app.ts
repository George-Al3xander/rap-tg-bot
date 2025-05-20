import { Bot } from "@/bot";
import { ErrorHandler, AdminGuard } from "@/modules";
import { SceneComposer, IntroScene } from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new SceneComposer(new IntroScene()),
    );
    bot.init();
};

bootstrap();
