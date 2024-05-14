import { Telegraf } from "telegraf"
import { TBotContext } from "../context/context.type"

export abstract class Command {
  constructor(public bot: Telegraf<TBotContext>) {}
  abstract handle(): void
}
