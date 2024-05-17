import { Telegraf } from "telegraf"
import { validateQuoteField } from "@/validators/validators"
import {
  StartWizard,
  QuoteStep,
  AuthorStep,
  SongNameStep,
 
} from "./create.quote.steps"
import { Scene } from "../../scene.class"
import { WizardContext } from "@/types/type"

export class CreateQuoteScene extends Scene {
  constructor(id: string) {
    const steps = [
      new StartWizard(),
      new QuoteStep(validateQuoteField("text")),
      new AuthorStep(validateQuoteField("author")),
      new SongNameStep(validateQuoteField("origin")),      
    ]

    super(id, ...steps)
  }
  registerTrigger(bot: Telegraf<WizardContext>) {
    bot.action("suggest", async (ctx) => {
      await ctx.deleteMessage()

      await ctx.scene!.enter(this.id)
    })
  }
}
