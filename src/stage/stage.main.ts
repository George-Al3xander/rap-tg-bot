import { TBotContext } from "@/context/context.type"
import { Telegraf, Scenes } from "telegraf"
import { Stage } from "./stage.class"
import { Scene } from "@/scenes/scene.class"
const TelegrafStage = Scenes.Stage

export class MainStage extends Stage {
  constructor(bot: Telegraf<TBotContext>, scenes: Scene[]) {
    super(bot)
    this.scenes = scenes
  }
  scenes: Scene[] = []
  init(): void {
    const stage = new TelegrafStage<any>(this.scenes)

    this.bot.use(stage.middleware())

    // Apply all registered scenes trigger
    for (const scene of this.scenes) {
      scene.registerTrigger(this.bot)
    }
  }
}
