import { formatQuote } from "@/lib/utils"
import { CTXFunc } from "@/types/type"
import { Markup } from "telegraf"
import { SceneStep } from "../step/step.class"

export class StartWizard extends SceneStep {
  validationMiddleware?: unknown
  constructor() {
    super()
  }
  register() {
    this.action("suggest", async (ctx) => {
      await ctx.reply("Give us a quote")
      return ctx.wizard.next()
    })
  }
}

export class QuoteStep extends SceneStep {
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
        return ctx.wizard!.next()
      })
    )
  }
}

export class AuthorStep extends SceneStep {
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
        return ctx.wizard!.next()
      })
    )
  }
}

export class SongNameStep extends SceneStep {
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
        return ctx.scene!.leave()
      })
    )
  }
}
