import { Bot } from "@/bot";
import { ErrorHandler } from "@/modules";

const bootstrap = () => {
    const bot = new Bot(new ErrorHandler());
    bot.init();
};

bootstrap();
