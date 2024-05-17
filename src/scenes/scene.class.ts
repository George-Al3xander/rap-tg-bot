import { WizardContext } from "@/types/type"
import { Middleware, Scenes, Telegraf } from "telegraf"

const { WizardScene } = Scenes

export abstract class Scene extends WizardScene<any> {
  constructor(id: string, ...steps: Middleware<any>[]) {
    for (const step of steps) {
      //@ts-ignore
      step.register()
    }
    super(id, ...steps)
    this.id = id
  }
  abstract registerTrigger(bot: Telegraf<WizardContext>): void
}
