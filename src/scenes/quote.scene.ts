import {
  Composer,
  Context,
  Markup,
  Middleware,
  Scenes,
  Telegraf,
} from "telegraf"
import { TBotContext } from "../context/context.type"
import { formatQuote } from "../lib/utils"
import { Scene } from "./scene.class"
import { SceneStep } from "./step/step.class"
const { WizardScene } = Scenes
import { WizardContext as WizC } from "telegraf/typings/scenes"
type WizardContext = TBotContext & WizC

// class StartWizard implements SceneStep {
//   composer: Composer<WizardContext>
//   constructor() {
//     this.composer = new Composer()
//   }
//   handle(): Composer<WizardContext> {
//     this.composer.on("text", async (ctx) => {
//       await ctx.reply("Give us a quote")
//       return ctx.wizard.next()
//     })

//     return this.composer
//   }
// }

class StartWizard extends Composer<WizardContext> {
  constructor() {
    super()
  }
  register() {
    this.action("suggest", async (ctx) => {
      await ctx.reply("Give us a quote")
      return ctx.wizard.next()
    })
  }
}

class QuoteStep extends Composer<WizardContext> {
  constructor() {
    super()
  }
  register() {
    this.on("text", async (ctx) => {
      const quote = ctx.text

      if (!quote || !/\S/.test(quote)) {
        await ctx.reply("Quote can't be an empty string")
        return ctx.wizard.back()
      }
      ctx.session.quote.text = quote
      await ctx.reply("Give us the author")
      return ctx.wizard.next()
    })
  }
}

class AuthorStep extends Composer<WizardContext> {
  constructor() {
    super()
  }
  register() {
    this.on("text", async (ctx) => {
      const author = ctx.text

      if (!author || !/\S/.test(author)) {
        await ctx.reply("Author can't be an empty string")
        return ctx.wizard.back()
      }
      ctx.session.quote.author = author

      await ctx.reply("Give us the song name")
      return ctx.wizard.next()
    })
  }
}

class SongNameStep extends Composer<WizardContext> {
  constructor() {
    super()
  }
  register() {
    this.on("text", async (ctx) => {
      const songName = ctx.text

      if (!songName || !/\S/.test(songName)) {
        await ctx.reply("Song name can't be an empty string")
        return ctx.wizard.back()
      }
      ctx.session.quote.origin = songName

      await ctx.reply("Here's the final quote")
      await ctx.replyWithHTML(
        formatQuote(ctx.session.quote),
        Markup.inlineKeyboard([
          Markup.button.callback("Confirm✅", "quote_confirm"),
          Markup.button.callback("Edit✏️", "quote_edit"),
        ])
      )
      return ctx.scene.leave()
    })
  }
}

export class QuoteScene extends WizardScene<any> {
  constructor(id: string) {
    const steps = [
      new StartWizard(),
      new QuoteStep(),
      new AuthorStep(),
      new SongNameStep(),
    ]
    for (const step of steps) {
      step.register()
    }
    super(id, ...steps)
  }

  registerTrigger(bot: Telegraf<WizardContext>): void {
    bot.action("suggest", async (ctx) => {
      await ctx.deleteMessage()

      await ctx.scene.enter(this.id)
    })
  }
}
