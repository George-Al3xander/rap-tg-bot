import { InlineKeyboard } from "grammy";
import { actionPayloads } from "@/constants";
import { buttons } from "public/messages.json";

export const startQuoteCreationKeyboard = new InlineKeyboard().text(
    buttons.START,
    actionPayloads.START_QUOTE_CREATION,
);
