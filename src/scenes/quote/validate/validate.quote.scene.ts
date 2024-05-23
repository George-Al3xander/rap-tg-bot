import { Scene } from "@/scenes/scene.class";
import { WizardContext } from "@/types/type";
import { validateQuoteKey } from "@/lib/validators/validators";
import { Telegraf } from "telegraf";
import { ActionDoneStep } from "../decision/decision.quote.steps";

import { InitialStep } from "./validate.quote.steps";

export class QuoteValidationScene extends Scene {
  constructor(id: string) {
    const steps = [
      new InitialStep(validateQuoteKey),
      new ActionDoneStep(validateQuoteKey),
    ];

    super(id, steps);
  }
  registerTrigger(bot: Telegraf<WizardContext>): void {}
}
