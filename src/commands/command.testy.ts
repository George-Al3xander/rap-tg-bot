import { Telegraf } from "telegraf"
import { TBotContext } from "../context/context.type"
import { Command } from "./command.class"

export class TestCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot)
  }
  handle(): void {
    //this.bot.hears("testquote", async (ctx: any) => ctx.scene.enter("quote"))
  }
}
