import { Markup } from "telegraf";
import { CTXFunc } from "@/types/type";
import { Quote } from "@/context/context.type";
import { SceneStep } from "@/scenes/step/step.class";
import { formatQuote } from "@/lib/utils";
import { quoteCreationMessages, quoteKeys, quoteRequestMessages } from "@/data";


export class DecisionStep extends SceneStep {
  chatId: string;
  constructor(chatId: string) {
    super();
    this.chatId = chatId;
  }
  validationMiddleware?: unknown;
  register(): void {
    this.action("quote_confirm", async (ctx) => {
      //await ctx.deleteMessage();
      await ctx.reply(quoteCreationMessages["progress"]);
      try {
        await ctx.telegram.sendMessage(
          this.chatId,
          formatQuote(ctx.session.quote),
          {
            parse_mode: "HTML",
          },
        );
        await ctx.reply(
          quoteCreationMessages["done"],
          Markup.inlineKeyboard([Markup.button.callback("Suggest", "suggest")]),
        );
        return await ctx.scene!.leave();
        
      } catch (error) {
        console.log(error);
        await ctx.reply(quoteCreationMessages["error"]);
      }
    });
    this.action("quote_edit", async (ctx) => {
      await ctx.deleteMessage();

      await ctx.reply(
        "Which part do you want to edit? Tap on the option below:",
        Markup.inlineKeyboard([
          quoteKeys.map((key) => {
            return Markup.button.callback(key, `quote_edit_${key}`);
          }),
          [Markup.button.callback("Cancel", "quote_edit_cancel")],
        ]),
      );
      return ctx.wizard.next();
    });
    this.action("quote_delete", async (ctx) => {
      await ctx.deleteMessage();
      ctx.session.quote = { author: "", origin: "", text: "" };
      await ctx.scene.leave();
      return await ctx.scene.enter("intro_scene");
    });
  }
}

export class ActionStep extends SceneStep {
  validationMiddleware?: unknown;
  register(): void {
    this.action("quote_edit_cancel", async (ctx) => {
      await ctx.deleteMessage();
      return await ctx.scene.reenter();
    });

    //Register action for all  quote keys
    quoteKeys.forEach((key) =>
      this.action(`quote_edit_${key}`, async (ctx) => {
        await ctx.deleteMessage();

        //@ts-ignore
        // Set what part of the quote user want to edit
        ctx.wizard.state.quoteKey = key;

        //Handle action for all  quote keys
        await ctx.reply(
          quoteRequestMessages[key],
          Markup.inlineKeyboard([
            Markup.button.callback("Cancel", "cancel_edit"),
          ]),
        );
        return ctx.wizard.next();
      }),
    );
  }
}

export class ActionDoneStep extends SceneStep {
  validationMiddleware: (
    key: keyof Quote,
    successCallback?: Function,
  ) => CTXFunc;
  constructor(
    paramMiddleware: (key: keyof Quote, successCallback?: Function) => CTXFunc,
  ) {
    super();
    this.validationMiddleware = paramMiddleware;
  }
  register(): void {
    this.on("text", async (ctx, next) => {
      //@ts-ignore
      // Get what part of the quote user want to edit
      const quoteKey = ctx.wizard.state.quoteKey as keyof Quote;

      // Validate user sent message with validators passed to the constructor
      const validationFunc = this.validationMiddleware(quoteKey, async () => {
        // Clean up and start a scene again
        await ctx.deleteMessage();
        return await ctx.scene.reenter();
      });
      validationFunc(ctx, next);
    });
    this.action("cancel_edit", async (ctx) => {
      await ctx.deleteMessage();
      return await ctx.scene.reenter();
    });
  }
}
