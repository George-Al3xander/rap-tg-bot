import { TBotContext } from "@/context/context.type"
import { Middleware, MiddlewareFn, NarrowedContext } from "telegraf"
import { Update, Message } from "telegraf/typings/core/types/typegram"
import { WizardContext as WizC } from "telegraf/typings/scenes"
import { MessageSubType, UpdateType } from "telegraf/typings/telegram-types"

export type WizardContext = TBotContext & WizC

export type TelegramEventType = UpdateType | MessageSubType

export type CTXFunc = MiddlewareFn<
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
