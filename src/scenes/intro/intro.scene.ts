import { WizardContext } from "@/types/type";
import { Markup, Telegraf } from "telegraf";
import { Scene } from "../scene.class";
import { startMessageText } from "@/data";
import { resetQuote } from "@/lib/utils";
import { IntroInitialStep } from "./intro.steps";

export class IntroScene extends Scene {
  constructor(id: string) {
    super(id, [new IntroInitialStep()]);
    this.enter((ctx) => {
      resetQuote(ctx);
      console.log(ctx.session);
      ctx.reply(
        startMessageText,
        Markup.inlineKeyboard([Markup.button.callback("Suggest", "suggest")]),
        
      );
      ctx.scene.leave();
    });
  }

  registerTrigger(bot: Telegraf<WizardContext>): void {}
}
