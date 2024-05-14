import { Composer, Context, Markup, Scenes } from "telegraf"
import { TBotContext } from "../context/context.type"
import { WizardContext as WizC } from "telegraf/typings/scenes"
import { formatQuote } from "../lib/utils"
const { WizardScene } = Scenes
type WizardContext = TBotContext & WizC
const startWizzard = new Composer<WizardContext>()

startWizzard.on("text", async (ctx) => {
  await ctx.reply("Give us a quote")
  return ctx.wizard.next()
})

const quoteStep = new Composer<WizardContext>()

quoteStep.on("text", async (ctx) => {
  const quote = ctx.text

  if (!quote || !/\S/.test(quote)) {
    await ctx.reply("Quote can't be an empty string")
    return ctx.wizard.back()
  }
  ctx.session.quote.text = quote
  await ctx.reply("Give us the author")
  return ctx.wizard.next()
})
const authorStep = new Composer<WizardContext>()

authorStep.on("text", async (ctx) => {
  const author = ctx.text

  if (!author || !/\S/.test(author)) {
    await ctx.reply("author can't be an empty string")
    return ctx.wizard.back()
  }
  ctx.session.quote.author = author

  await ctx.reply("Give us the song name")
  return ctx.wizard.next()
})

const songNameStep = new Composer<WizardContext>()

songNameStep.on("text", async (ctx) => {
  const songName = ctx.text

  if (!songName || !/\S/.test(songName)) {
    await ctx.reply("songName can't be an empty string")
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

export const testScene = new WizardScene(
  "wizzard",

  startWizzard,
  quoteStep,
  authorStep,
  songNameStep
)
