import type { SessionData } from "@/types/models";

export const formatQuoteHtml = ({ text, author, origin }: SessionData) =>
    `${text} \n \n   <strong>${author}</strong>, <i>"${origin}"</i>`;
