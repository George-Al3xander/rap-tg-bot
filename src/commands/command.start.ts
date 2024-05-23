import { TBotContext } from "@/context/context.type";
import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { startMessageText } from "@/data";
import { resetQuote } from "@/lib/utils";

export class StartCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot);
  }
  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx);
      ctx.scene.enter("intro_scene");
    });
  }
}
