import { WizardContext } from "@/types/type";
import { Context } from "telegraf";

type Quote = Partial<{ text: string; author: string; origin: string }>;
const bold = (text?: string) => `<strong>${text || "Text"}</strong>`;
const italic = (text?: string) => `<i>${text || "Text"}</i>`;

export const formatQuote = ({ text, author, origin }: Required<Quote>) =>
  `${text} \n \n   ${bold(author)}, ${italic(`"${origin}"`)}`;

export const replyError = (ctx: Context, error: unknown) =>
  ctx.reply(error instanceof Error ? error.message : "Something went wrong");

export const resetQuote = (ctx: WizardContext) =>
  (ctx.session.quote = { author: "", origin: "", text: "" });

