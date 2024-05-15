import { Middleware, NarrowedContext } from "telegraf"
import { Update, Message } from "telegraf/typings/core/types/typegram"
import { WizardContext as WizC } from "telegraf/typings/scenes"
import { MessageSubType, UpdateType } from "telegraf/typings/telegram-types"
import { Quote, TBotContext } from "../context/context.type"
type WizardContext = TBotContext & WizC
type TelegramEventType = UpdateType | MessageSubType
export type CTXFunc = Middleware<
  NarrowedContext<
    WizardContext,
    {
      message: Update.New & Update.NonChannel & Message.TextMessage
      update_id: number
    }
  >,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage
    update_id: number
  }
>


export function validationWrapper(validationFn?: CTXFunc | CTXFunc[]) {
  return function (...fns: CTXFunc[]) {
    if (!validationFn) {
      return fns
    }
    if (Array.isArray(validationFn)) {
      return [...validationFn, ...fns]
    }
    return [validationFn, ...fns]
  }
}
const replyError = (ctx: WizardContext, error: unknown) =>
  ctx.reply(error instanceof Error ? error.message : "Something went wrong")

export const validateQuoteField = (key: keyof Quote) => {
  return validationWrapper(function (ctx: WizardContext, next) {
    const str = ctx.text

    try {
      if (!str || !/\S/.test(str)) {
        throw new Error(
          `${key[0].toUpperCase() + key.slice(1)} can't be an empty string`
        )
      }
      if (str.length < 3) {
        throw new Error(`${key[0].toUpperCase() + key.slice(1)} is too short`)
      }
      ctx.session.quote[key] = str
      next()
    } catch (error) {
      replyError(ctx, error)
    }
  } as CTXFunc)
}

//6.10.4
// try {
//   validateQuoteField(ctx, "text")
//   await ctx.reply("Give us the author")
//   return ctx.wizard.next()
// } catch (error) {
//   replyError(ctx, error)
// }
