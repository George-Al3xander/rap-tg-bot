import { Telegraf } from "telegraf";
import { validateQuoteField } from "@/lib/validators/validators";
import {
  InitialCreationStep,
  FinalCreationStep,
  FactoryStep,
  factorySteps,
} from "./create.quote.steps";

import { WizardContext } from "@/types/type";
import { Scene } from "@/scenes/scene.class";
import { Quote } from "@/context/context.type";


export class CreateQuoteScene extends Scene {
  constructor(id: string) {
    const steps = [
      new InitialCreationStep(),
      ...factorySteps,
      new FinalCreationStep(validateQuoteField("origin")),
    ];

    super(id, steps);
  }
  registerTrigger(bot: Telegraf<WizardContext>) {
    bot.action("suggest", async (ctx) => {
      await ctx.deleteMessage();

      await ctx.scene!.enter(this.id);
    });
  }
}
