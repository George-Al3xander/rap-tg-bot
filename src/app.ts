import { Telegraf } from "telegraf";
import { ConfigService } from "./config/config.service";
import { TConfigService } from "./config/config.type";
import { TBotContext } from "./context/context.type";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/command.start";
import LocalSession from "telegraf-session-local";
import { CreateQuoteScene } from "./scenes/quote/create/create.quote.scene";
import { QuoteDecisionScene } from "@/scenes/quote/decision/decision.quote.scene";
import { MainStage } from "./stage/stage.main";
import { adminMiddleWare } from "./middleware/middleware.admin";
import { groupMiddleware } from "./middleware/middleware.group";
import { QuoteValidationScene } from "./scenes/quote/validate/validate.quote.scene";
import { IntroScene } from "./scenes/intro/intro.scene";

class Bot {
  bot: Telegraf<TBotContext>;
  commands: Command[] = [];
  scenes: any[] = [];
  options?: Partial<Telegraf.Options<TBotContext>> | undefined;
  constructor(
    private readonly configService: TConfigService,
    options?: Partial<Telegraf.Options<TBotContext>> | undefined,
  ) {
    this.bot = new Telegraf<TBotContext>(
      this.configService.get("BOT_TOKEN"),
      options,
    );
    //Middleware for ignoring messages for specified groups
    this.bot.use(groupMiddleware(this.configService.get("GROUP_ID")));

    // Middleware for protecting bot functionality from non-admin users
    this.bot.use(adminMiddleWare(this.configService.get("ADMIN_ID")));

    // Local session middleware
    this.bot.use(new LocalSession({ database: "session.json" }).middleware());
  }

  init() {
    // Register all bot commands
    this.commands = [new StartCommand(this.bot)];

    // Register all bot scenes
    this.scenes = [
      new IntroScene("intro_scene"),
      new CreateQuoteScene("quote"),
      new QuoteDecisionScene(
        "quote_decision",
        this.configService.get("GROUP_ID"),
      ),
      new QuoteValidationScene("quote_validate"),
    ];

    // Create and initialize a new stage
    new MainStage(this.bot, this.scenes).init();

    // Apply all registered commands
    for (const command of this.commands) {
      command.handle();
    }
    
    this.bot.launch(() => console.log("Bot launched"));
  }
}
// option - { channelMode: true }
const bot = new Bot(new ConfigService());
bot.init();
