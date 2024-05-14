import { inlineKeyboard } from "telegraf/typings/markup"

export const onStart = {
  message:
    "Welcome to MoreThanRapBot! 🎤 Want to contribute to the vibe? Drop your sickest rap quotes and let's keep the flow going! Just type /suggest followed by your quote to add your flavor to the mix. Let's keep those bars hot! 🔥",
  reply_markup: {
    inline_keyboard: [[{ text: "Suggest", callback_data: "suggest" }]],
  },
}
