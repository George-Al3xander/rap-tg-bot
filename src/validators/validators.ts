import { Quote } from "@/context/context.type"
import { replyError } from "@/lib/utils"
import { CTXFunc, WizardContext } from "@/types/type"
import { validationWrapper } from "./validator.fn"

export const validateQuoteKey =
  (key: keyof Quote, successCallback?: Function): CTXFunc =>
  (ctx: WizardContext, next) => {
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
      if (successCallback) {
        successCallback()
      } else {
        next()
      }
    } catch (error) {
      return replyError(ctx, error)
    }
  }

export const validateQuoteField = (key: keyof Quote) => {
  return validationWrapper(validateQuoteKey(key))
}
