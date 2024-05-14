import { Scenes, Telegraf, session } from "telegraf"
import { ConfigService } from "./config/config.service"
import { TConfigService } from "./config/config.type"
import { TBotContext } from "./context/context.type"
import { Command } from "./commands/command.class"
import { StartCommand } from "./commands/command.start"
import LocalSession from "telegraf-session-local"
import { HandleMessageCommand } from "./commands/command.message"
import { CreateQuoteCommand } from "./commands/command.create"

import { QuoteScene } from "./scenes/quote.scene"
import { TestCommand } from "./commands/command.testy"
import { Stage as TStage } from "telegraf/typings/scenes"
import { SceneRegistrator } from "./commands/command.scene.registration"
const { Stage } = Scenes
class Bot {
  bot: Telegraf<TBotContext>
  commands: Command[] = []
  scenes: any[] = []
  constructor(private readonly configService: TConfigService) {
    this.bot = new Telegraf<TBotContext>(this.configService.get("BOT_TOKEN"))
    this.bot.use(new LocalSession({ database: "session.json" }).middleware())
  }

  init() {
    this.commands = [new StartCommand(this.bot), new TestCommand(this.bot)]

    for (const command of this.commands) {
      command.handle()
    }

    this.scenes = [new QuoteScene("quote")]
    const stage = new Stage<any>(this.scenes)
    this.bot.use(stage.middleware())

    for (const scene of this.scenes) {
      scene.registerTrigger(this.bot)
    }

    this.bot.launch(() => console.log("Bot launched"))
  }
}

const bot = new Bot(new ConfigService())
bot.init()
