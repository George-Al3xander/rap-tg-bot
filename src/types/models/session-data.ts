import type { Quote } from "./quote";

export type SessionData = Quote & {
    isEdit: boolean;
    cachedMessage: { id: number; chatId: number } | null;
};
