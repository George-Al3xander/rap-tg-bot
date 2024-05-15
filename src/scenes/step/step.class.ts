import { Composer, Telegraf } from "telegraf"
import { TBotContext } from "../../context/context.type"
import { WizardContext as WizC } from "telegraf/typings/scenes"
import { MessageSubType, UpdateType } from "telegraf/typings/telegram-types"
type WizardContext = TBotContext & WizC

export abstract class SceneStep extends Composer<WizardContext> {
  abstract validationMiddleware?: unknown
  abstract register(): void
}
