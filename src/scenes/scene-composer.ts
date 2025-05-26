import type { BotModule, FrameworkBot } from "@/types/models";
import type { BaseScene } from "./base-scene";

export class SceneComposer implements BotModule {
    private readonly scenes: BaseScene[];

    constructor(...scenes: BaseScene[]) {
        this.scenes = scenes;
    }

    apply(bot: FrameworkBot): void {
        for (const scene of this.scenes.reverse()) {
            bot.use(scene.getMiddleware());
        }

        for (const scene of this.scenes) {
            scene.apply(bot);
        }
    }
}
