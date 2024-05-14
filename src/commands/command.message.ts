import { Markup, Telegraf } from "telegraf"
import { TBotContext } from "../context/context.type"
import { Command } from "./command.class"

export class HandleMessageCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot)
  }
  handle(): void {
    this.bot.on("message", (ctx) => {
      const { currentStep } = ctx.session
      const { text } = ctx
      if (!text) {
        ctx.reply("Can't be empty")
        return
      }
      ctx.session.quote[currentStep] = text
      switch (currentStep) {
        case "text":
          {
            //ctx.reply("Give us the quote")
            ctx.session.currentStep = "author"
          }
          break
        case "author":
          {
            ctx.reply("Give us the  author")
            ctx.session.currentStep = "origin"
          }
          break
        case "origin":
          {
            ctx.reply("Give us the song name")
            //ctx.session.currentStep = "text"
          }
          break
      }
    })
  }
}
