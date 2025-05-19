import { Bot } from "@/bot";
import { ErrorHandler, AdminGuard } from "@/modules";
import { SceneComposer } from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        new ErrorHandler(),
        new AdminGuard(),
        new SceneComposer(),
    );
    bot.init();
};

bootstrap();
