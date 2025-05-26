import type { Quote } from "@/types/models";

export const formatQuoteHtml = ({ text, author, origin }: Quote) =>
    `${text} \n \n   <strong>${author}</strong>, <i>"${origin}"</i>`;
