import { InlineKeyboard } from "grammy";
import { actionPayloads } from "@/constants";
import { buttons } from "public/messages.json";

export const startQuoteCreationKeyboard = new InlineKeyboard().text(
    buttons.START,
    actionPayloads.START_QUOTE_CREATION,
);

export const quoteDecisionKeyboard = new InlineKeyboard()
    .text(buttons.CONFIRM_QUOTE, actionPayloads.CONFIRM_QUOTE_CREATION)
    .row()
    .text(buttons.EDIT_QUOTE, actionPayloads.EDIT_QUOTE_CREATION)
    .text(buttons.CANCEL_QUOTE, actionPayloads.CANCEL_QUOTE_CREATION);

export const quoteEditOptionsKeyboard = new InlineKeyboard()
    .text(buttons.EDIT_QUOTE_TEXT, actionPayloads.EDIT_QUOTE_TEXT)
    .text(buttons.EDIT_QUOTE_AUTHOR, actionPayloads.EDIT_QUOTE_AUTHOR)
    .text(buttons.EDIT_QUOTE_ORIGIN, actionPayloads.EDIT_QUOTE_ORIGIN)
    .row()
    .text(buttons.CANCEL_EDIT, actionPayloads.CANCEL_EDIT);
