import { Composer } from "telegraf"
import { TBotContext } from "../../context/context.type"
import { SceneStep } from "./step.class"
import { WizardContext as WizC } from "telegraf/typings/scenes"
type WizardContext = TBotContext & WizC
export class Test extends Composer<WizardContext> {
  constructor() {
    super()
  }
  handle(): void {
    //this.composer.on("text", (ctx) => ctx.reply("Test"))
    this.on("text", async (ctx) => {
      const quote = ctx.text
    
      if (!quote || !/\S/.test(quote)) {
        await ctx.reply("Quote can't be an empty string")
        return ctx.wizard.back()
      }
      ctx.session.quote.text = quote
      await ctx.reply("Give us the author")
      return ctx.wizard.next()
    })
  }
}
