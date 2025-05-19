import type { BotModule, FrameworkBot } from "@/types/models";
import { GrammyError, HttpError } from "grammy";
import { logger } from "@/logger";

export class ErrorHandler implements BotModule {
    apply(bot: FrameworkBot): void {
        bot.catch((err) => {
            const ctx = err.ctx;
            const e = err.error;

            const errObj: Record<string, unknown> = {
                updateId: ctx?.update?.update_id ?? "unknown",
                type: "Unknown",
                description: "Something went wrong.",
            };

            if (e instanceof GrammyError) {
                errObj.type = "GrammyError";
                errObj.description = `Error in request: ${e.description}`;
            } else if (e instanceof HttpError) {
                errObj.type = "HttpError";
                errObj.description = `Could not contact Telegram: ${e.message}`;
            } else if (e instanceof Error) {
                errObj.type = "ProgramError";
                errObj.description = e.message;
            } else {
                errObj.type = e?.constructor?.name ?? "UnknownError";
                errObj.description = "Unknown error occurred.";
            }

            errObj.meta = {
                userId: ctx?.from?.id,
                chatId: ctx?.chat?.id,
                messageText: ctx?.message?.text,
            };

            logger.error(errObj, "Error while handling update");
        });
    }
}
