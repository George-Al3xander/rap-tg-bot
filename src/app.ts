import { Bot } from "@/bot";
import { ErrorHandler, AdminGuard } from "@/modules";

const bootstrap = () => {
    const bot = new Bot(new ErrorHandler(), new AdminGuard());
    bot.init();
};

bootstrap();
