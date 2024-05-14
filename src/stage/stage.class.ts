import { Context, Scenes } from "telegraf"
import { Quote, SessionData, TBotContext } from "../context/context.type"
import { BaseScene } from "telegraf/typings/scenes"

const TelegrafStage = Scenes.Stage
const { WizardScene } = Scenes

export class Stage {
  scenes: any[]
  constructor() {
    this.scenes = [new WizardScene("id")]
  }

  init() {
    const stage = new TelegrafStage(this.scenes)
  }
}
