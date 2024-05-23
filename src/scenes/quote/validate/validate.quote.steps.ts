import { Quote } from "@/context/context.type";
import { quoteKeys, quoteRequestMessages } from "@/data";
import { SceneStep } from "@/scenes/step/step.class";
import { CTXFunc } from "@/types/type";


export class FinalStep extends SceneStep {
  validationMiddleware?: unknown;
  register(): void {
    this.on("text", async (ctx) => {
      await ctx.deleteMessage();
      return await ctx.scene.reenter();
    });
  }
}

export class InitialStep extends SceneStep {
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
    this.use(async (ctx) => {
      let fail = false;
      for (const key of quoteKeys) {
        if (!ctx.session.quote[key]) {
          await ctx.reply(quoteRequestMessages[key]);
          //@ts-ignore
          ctx.wizard.state.quoteKey = key;
          fail = true;

          break;
        }
      }
      if (!fail) {
        await ctx.scene.leave();
        return ctx.scene.enter("quote_decision");
      } else {
        return ctx.wizard.next();
      }
    });
  }
}
