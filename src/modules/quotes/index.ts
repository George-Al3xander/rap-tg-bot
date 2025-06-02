import { CancelQuote } from "./cancel-quote";
import { ConfirmQuote } from "./confirm-quote";
import { EditQuote } from "./edit-quote";

export const quoteModules = [
    new ConfirmQuote(),
    new CancelQuote(),
    new EditQuote(),
];
