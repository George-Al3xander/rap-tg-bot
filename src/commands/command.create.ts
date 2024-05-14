import { Telegraf } from "telegraf"
import { TBotContext } from "../context/context.type"
import { Command } from "./command.class"

export class CreateQuoteCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot)
  }
  handle(): void {
    this.bot.action("suggest", (ctx) => {
      ctx.session.currentStep = "text"
      ctx.editMessageText("Give us the quote")
    })
  }
}
