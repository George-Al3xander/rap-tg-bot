import { TBotContext } from "@/context/context.type"
import { Scene } from "@/scenes/scene.class"
import { WizardContext } from "@/types/type"

import { Telegraf } from "telegraf"

export abstract class Stage {
  bot: Telegraf<TBotContext>
  scenes: Scene[] = []
  constructor(bot: Telegraf<TBotContext>) {
    this.bot = bot
  }

  abstract init(): void
}
