import {
  Composer,
  Context,
  Markup,
  Middleware,
  Scenes,
  Telegraf,
} from "telegraf"
import { Quote, TBotContext } from "../context/context.type"
import { formatQuote } from "../lib/utils"
import { Scene } from "./scene.class"
import { SceneStep } from "./step/step.class"
const { WizardScene } = Scenes
import { WizardContext as WizC } from "telegraf/typings/scenes"
import { performance } from "perf_hooks"
import { MaybeArray } from "telegraf/typings/core/helpers/util"
import { CTXFunc, validateQuoteField } from "../validators/validators"

type WizardContext = TBotContext & WizC

class StartWizard extends SceneStep {
  validationMiddleware?: unknown
  constructor(valid: any) {
    super()
    this.validationMiddleware = valid
  }
  register() {
    this.action("suggest", async (ctx) => {
      await ctx.reply("Give us a quote")
      return ctx.wizard.next()
    })
  }
}

class QuoteStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }

  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply("Give us the author")
        return ctx.wizard.next()
      })
    )
  }
}

class AuthorStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }
  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply("Give us the song name")
        return ctx.wizard.next()
      })
    )
  }
}

class SongNameStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }
  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply("Here's the formatted quote🟢⬇️")
        await ctx.replyWithHTML(
          formatQuote(ctx.session.quote),
          Markup.inlineKeyboard([
            Markup.button.callback("Confirm✅", "quote_confirm"),
            Markup.button.callback("Edit✏️", "quote_edit"),
          ])
        )
        return ctx.scene.leave()
      })
    )
  }
}

export class QuoteScene extends WizardScene<any> {
  constructor(id: string) {
    const steps = [
      new StartWizard(12),
      new QuoteStep(validateQuoteField("text")),
      new AuthorStep(validateQuoteField("author")),
      new SongNameStep(validateQuoteField("origin")),
    ]

    for (const step of steps) {
      step.register()
    }
    super(id, ...steps)
  }

  registerTrigger(bot: Telegraf<WizardContext>): void {
    bot.action("suggest", async (ctx) => {
      await ctx.deleteMessage()

      await ctx.scene.enter(this.id)
    })
  }
}
