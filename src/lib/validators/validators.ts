import { Quote } from "@/context/context.type"
import { replyError } from "@/lib/utils"
import { CTXFunc, WizardContext } from "@/types/type"
import { validationWrapper } from "./validator.fn"
import { quoteKeys, quotePartLengthMessages, quoteRequestMessages } from "@/data"


export const validateQuoteKey =
  (key: keyof Quote, successCallback?: Function): CTXFunc =>
  (ctx: WizardContext, next) => {
    const str = ctx.text
    try {
      if (!str || !/\S/.test(str)) {
        throw new Error(quotePartLengthMessages[key])
      }
      if (str.length < 3) {
        throw new Error(quotePartLengthMessages[key])
      }
      ctx.session.quote[key] = str
      if (successCallback) {
        successCallback()
      } else {
        next()
      }
    } catch (error) {
      return replyError(ctx, error)
    }
  }

export const checkQuoteCompleteness = async (
  ctx: WizardContext,
  next: Function
) => {
  let fail = false

  for (const key of quoteKeys) {
    if (!ctx.session.quote[key]) {
      await ctx.reply(quoteRequestMessages[key])
      //@ts-ignore
      ctx.wizard.state.quoteKey = key

      fail = true
      break
    }
  }
  if (fail) return

  next()
}

export const handleQuoteCompleteness = async (
  ctx: WizardContext,
  next: Function
) => {
  //@ts-ignore
  const emptyKey = ctx.wizard.state.quoteKey as keyof Quote | undefined
  if (emptyKey) {
    validateQuoteKey(emptyKey, () => {
      //@ts-ignore
      ctx.wizard.state.quoteKey = undefined
      next()
    })
    return
  }
  next()
}

export const validateQuoteCompleteness = validationWrapper([
  checkQuoteCompleteness,
  handleQuoteCompleteness,
])

export const validateQuoteField = (key: keyof Quote) => {
  return validationWrapper(validateQuoteKey(key))
}

export type TValidateQuoteField = typeof validateQuoteField