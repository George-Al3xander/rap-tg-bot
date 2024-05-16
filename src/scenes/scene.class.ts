import { WizardContext } from "@/types/type"
import { Middleware, Scenes, Telegraf } from "telegraf"

const { WizardScene } = Scenes

export abstract class Scene extends WizardScene<any> {
  constructor(id: string, ...steps: Middleware<any>[]) {
    super(id, ...steps)
    this.id = id
  }
  abstract registerTrigger(bot: Telegraf<WizardContext>): void
}
