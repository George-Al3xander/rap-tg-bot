export const conversationIDs = {
    TEXT_REQUEST: "quote-conversation-text-request",
    AUTHOR_REQUEST: "quote-conversation-author-request",
    ORIGIN_REQUEST: "quote-conversation-origin-request",
    CONFIRMATION: "quote-conversation-confirm",
    INTRO: "quote-conversation-intro",
} as const;

export const actionPayloads = {
    START_QUOTE_CREATION: "start-creation",
    CONFIRM_QUOTE_CREATION: "confirm-creation",
    EDIT_QUOTE_CREATION: "edit-creation",
    CANCEL_QUOTE_CREATION: "cancel-creation",
    EDIT_QUOTE_TEXT: "edit-quote-text",
    EDIT_QUOTE_AUTHOR: "edit-quote-author",
    EDIT_QUOTE_ORIGIN: "edit-quote-origin",
    CANCEL_EDIT: "edit-quote-cancel",
} as const;
