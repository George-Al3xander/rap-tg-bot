import { Composer, Telegraf } from "telegraf"
import { TBotContext } from "../../context/context.type"
import { WizardContext as WizC } from "telegraf/typings/scenes"
type WizardContext = TBotContext & WizC
export abstract class SceneStep {
  abstract composer: Composer<WizardContext>
  abstract handle(): Composer<WizardContext>
}
