import { Quote } from "./context/context.type";

export const startMessageText =
  "Welcome to MoreThanRapBot! 🎤 Want to contribute to the vibe? Drop your sickest rap quotes and let's keep the flow going! Let's keep those bars hot! 🔥";

export const quoteRequestMessages: Quote = {
  text: "Please provide the text of the quote.",
  author: "Please share the name of the author of this quote.",
  origin: "Specify the origin of this quote, like the song or album.",
};

export const quoteCreationMessages = {
  progress:
    "🔨 Working on it! Thanks for your input. Sit tight while we craft your quote. 💬",
  done: "🎤 Your rap quote is ready! Check it out. Let us know if you need anything else! 🎶",
  error: "Oops! Something went wrong. Please try again later. 🚫",
  format: "Here's your rap quote: 🎤",
};

export const quotePartLengthMessages: Quote = {
  text: "Quote too short. Provide a longer quote.",
  author: "Author name too short. Provide a longer name.",
  origin: "Quote origin too short. Provide more info.",
};

export const quoteKeys: (keyof Quote)[] = ["text", "author", "origin"];
