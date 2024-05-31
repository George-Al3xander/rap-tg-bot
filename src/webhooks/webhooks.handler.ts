import { TBotContext } from "@/context/context.type";
import express from "express";
import { Telegraf } from "telegraf";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT || 3000;

export class WebhooksHandler {
  bot: Telegraf<TBotContext>;

  constructor(bot: Telegraf<TBotContext>) {
    this.bot = bot;
  }

  setup(successCallback: Function): void {
    const SECRET_PATH = `/telegraf/${this.bot.secretPathComponent()}`;
    app.use(this.bot.webhookCallback(SECRET_PATH));

    app.get("/", (__req, res) => {
      res.send("Bot is running");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      this.bot.telegram.setWebhook(`${process.env.HOST_URL}${SECRET_PATH}`);
    });
    successCallback();
  }
}
