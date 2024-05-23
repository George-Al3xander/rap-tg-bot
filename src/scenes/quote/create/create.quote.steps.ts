import { Quote } from "@/context/context.type";
import { quoteRequestMessages } from "@/data";
import { validateQuoteField } from "@/lib/validators/validators";
import { SceneStep } from "@/scenes/step/step.class";
import { CTXFunc } from "@/types/type";

export class FactoryStep extends SceneStep {
  validationMiddleware?: (...fns: CTXFunc[]) => CTXFunc[];
  quoteAspect: keyof Quote;
  constructor(
    quoteAspect: keyof Quote,
    valFunc?: (...fns: CTXFunc[]) => CTXFunc[],
  ) {
    super();
    this.quoteAspect = quoteAspect;
    this.validationMiddleware = valFunc;
  }

  register() {
    this.on(
      "text",
      // Using ts-ignore is necessary due to the incorrect action parameter type, which deviates from the documentation.
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply(quoteRequestMessages[this.quoteAspect]);
        return ctx.wizard!.next();
      }),
    );
  }
}

export class InitialCreationStep extends SceneStep {
  validationMiddleware?: unknown;
  constructor() {
    super();
  }
  register() {
    this.action("suggest", async (ctx) => {
      await ctx.reply(quoteRequestMessages["text"]);
      return ctx.wizard.next();
    });
  }
}

export class FinalCreationStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[];
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super();
    this.validationMiddleware = val;
  }
  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.scene.leave();
        return ctx.scene.enter("quote_validate");
      }),
    );
  }
}



const factoryStepsObjects: { current: keyof Quote; next: keyof Quote }[] = [
  {
    current: "text",
    next: "author",
  },
  {
    current: "author",
    next: "origin",
  },
];
export const factorySteps = factoryStepsObjects.map(
  ({ current, next }) => new FactoryStep(next, validateQuoteField(current)),
);