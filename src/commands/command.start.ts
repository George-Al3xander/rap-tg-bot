import { Markup, Telegraf } from "telegraf"
import { Command } from "./command.class"
import { TBotContext } from "../context/context.type"

export class StartCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot)
  }
  handle(): void {
    this.bot.start((ctx) => {
      ctx.session.quote = { author: "", origin: "", text: "" }
      console.log(ctx.session)
      ctx.reply(
        "Welcome to MoreThanRapBot! 🎤 Want to contribute to the vibe? Drop your sickest rap quotes and let's keep the flow going! Just type /suggest followed by your quote to add your flavor to the mix. Let's keep those bars hot! 🔥",
        Markup.inlineKeyboard([Markup.button.callback("Suggest", "suggest")])
      )
    })
  }
}
