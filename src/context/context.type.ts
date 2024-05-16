import { Context, session } from "telegraf"
import { Update } from "telegraf/typings/core/types/typegram"
import { WizardContext } from "telegraf/typings/scenes"

export type Quote = {
  text: string
  author: string
  origin: string
}

export type SessionData = {
  course_like: boolean
  quote: Quote
  currentStep: keyof Quote
}

export type TBotContext = Context &
  WizardContext & {
    session: SessionData
  }
