import { Telegraf } from "telegraf"
import { validateQuoteField } from "@/validators/validators"
import { StartWizard, QuoteStep, AuthorStep, SongNameStep } from "./quote.steps"
import { Scene } from "../scene.class"
import { WizardContext } from "@/types/type"

export class QuoteScene extends Scene {
  constructor(id: string) {
    const steps = [
      new StartWizard(),
      new QuoteStep(validateQuoteField("text")),
      new AuthorStep(validateQuoteField("author")),
      new SongNameStep(validateQuoteField("origin")),
    ]

    for (const step of steps) {
      step.register()
    }
    super(id, ...steps)
  }
  registerTrigger(bot: Telegraf<WizardContext>) {
    bot.action("suggest", async (ctx) => {
      await ctx.deleteMessage()

      await ctx.scene!.enter(this.id)
    })
  }
}
