import { Markup, Telegraf } from "telegraf";

import {
  ActionDoneStep,
  ActionStep,
  DecisionStep,
} from "./decision.quote.steps";
import { Scene } from "@/scenes/scene.class";
import { WizardContext } from "@/types/type";
import { formatQuote } from "@/lib/utils";
import { validateQuoteKey } from "@/lib/validators/validators";
import { quoteCreationMessages } from "@/data";

export class QuoteDecisionScene extends Scene {
  constructor(id: string, chatId: string) {
    const steps = [
      new DecisionStep(chatId),
      new ActionStep(),
      new ActionDoneStep(validateQuoteKey),
    ];

    super(id, steps);
    this.enter(async (ctx) => {
      await ctx.reply(quoteCreationMessages["format"]);
      await ctx.replyWithHTML(
        formatQuote(ctx.session.quote),
        Markup.inlineKeyboard([
          [
            Markup.button.callback("Confirm✅", "quote_confirm"),
            Markup.button.callback("Edit✏️", "quote_edit"),
          ],
          [Markup.button.callback("Cancel🗑️", "quote_delete")],
        ]),
      );
    });
  }

  registerTrigger(bot: Telegraf<WizardContext>): void {
    bot.action("quote_decision", async (ctx) => {
      await ctx.scene!.enter(this.id);
    });
  }
}
