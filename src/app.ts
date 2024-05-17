import { Telegraf, session } from "telegraf"
import { ConfigService } from "./config/config.service"
import { TConfigService } from "./config/config.type"
import { TBotContext } from "./context/context.type"
import { Command } from "./commands/command.class"
import { StartCommand } from "./commands/command.start"
import LocalSession from "telegraf-session-local"
import { CreateQuoteScene } from "./scenes/quote/create/create.quote.scene"
import { QuoteDecisionScene } from "@/scenes/quote/decision/decision.quote.scene"
import { MainStage } from "./stage/stage.main"

class Bot {
  bot: Telegraf<TBotContext>
  commands: Command[] = []
  scenes: any[] = []
  constructor(private readonly configService: TConfigService) {
    this.bot = new Telegraf<TBotContext>(this.configService.get("BOT_TOKEN"))
    this.bot.use(new LocalSession({ database: "session.json" }).middleware())
  }

  init() {
    // Register all bot commands
    this.commands = [new StartCommand(this.bot)]

    // Apply all registered commands
    for (const command of this.commands) {
      command.handle()
    }

    // Register all bot scenes
    this.scenes = [
      new CreateQuoteScene("quote"),
      new QuoteDecisionScene("quote_decision"),
    ]

    // Create and initialize a new stage
    new MainStage(this.bot, this.scenes).init()

    this.bot.launch(() => console.log("Bot launched"))
  }
}

const bot = new Bot(new ConfigService())
bot.init()
