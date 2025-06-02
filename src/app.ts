import { Bot } from "@/bot";
import { middleware, plugins, quoteModules } from "@/modules";
import {
    IntroScene,
    QuoteDecisionScene,
    QuoteFieldScenes,
    SceneComposer,
} from "@/scenes";

const bootstrap = () => {
    const bot = new Bot(
        ...middleware,
        ...plugins,
        new SceneComposer(
            new IntroScene(),
            ...new QuoteFieldScenes(),
            new QuoteDecisionScene(),
        ),
        ...quoteModules,
    );
    bot.init();
};

bootstrap();
