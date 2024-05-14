import { Context, Middleware, Scenes, Telegraf } from "telegraf"
import { TBotContext } from "../context/context.type"
import { SceneOptions } from "telegraf/typings/scenes/base"
import {
  WizardContext as WizC,
  WizardScene as TWizardScene,
} from "telegraf/typings/scenes"
import { Update } from "telegraf/typings/core/types/typegram"
type WizardContext = TBotContext & WizC

const { WizardScene } = Scenes

export abstract class Scene {
  abstract steps: Middleware<TBotContext>
  constructor(public id: string) {}
  abstract registerTrigger(bot: Telegraf<WizardContext>): void
  abstract init(): Scenes.WizardScene<
    any & {
      scene: Scenes.SceneContextScene<any, Scenes.WizardSessionData>
      wizard: Scenes.WizardContextWizard<any>
    }
  >

  //   init() {
  //     this.bot.on("message")
  //const scene = new WizardScene(this.id,...this.steps)
  //     return scene
  //   }
}
