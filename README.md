# 📚 Quote Bot 

**Quote Bot** is a Telegram bot built with [grammY](https://grammy.dev/) and TypeScript, designed to help users collect and share the best quotes. It guides users through a conversational flow to ensure quotes are properly formatted, complete, and ready to be shared — with options to confirm, edit, or cancel submissions.

## 🧰 Tech Stack

- **Language**: TypeScript
- **Bot Framework**: grammY
- **Web Server**: Express (used for Telegram webhook support)
- **State & Flow**: `@grammyjs/conversations`, session middleware
- **Logging**: `pino`, `pino-pretty`
- **Config Validation**: `envalid`
- **Formatting & Linting**: Biome
- **Pre-commit Hooks**: Husky + lint-staged

## 🧪 Available Scripts

- `pnpm dev` – Start the bot in development mode
- `pnpm build` – Compile the TypeScript code to JavaScript
- `pnpm start` – Run the compiled bot from the `dist/` folder
- `pnpm format` – Format code using Biome
- `pnpm format:check` – Check for unformatted code
- `pnpm lint` – Type-check and lint the project

## ✨ Features

- 📝 **Submit Quotes**: Collect user-submitted quotes with context.
- 🧑‍🎓 **Specify Author**: Prompt users to provide the author of the quote.
- 📚 **Add Source Info**: Collect additional context (e.g. book, speech, time).
- ✏️ **Edit Submissions**: Users can edit any part of their submission.
- ✅ **Quote Confirmation UI**: Present final quote with Confirm / Edit / Cancel options.
- 🧪 **Input Validation**: Enforce length limits for better formatting.
- 🔒 **Admin Middleware**: Restrict bot usage to authorized users.
- 💾 **Session Management**: Use middleware for local session handling.
- 🧠 **Scene-based Flow**: Implemented using `@grammyjs/conversations`.
- 🌐 **Webhook Support via Express**: Run the bot through Express.js using Telegram webhooks.

## 🤖 Bot Commands & Flow

### `/start`
Begins the interaction. The user is prompted to submit a new quote.

### Quote Submission Flow

1. **Request for Quote Text** – Prompt the user to enter the quote.
2. **Request for Author Name** – Ask who said the quote.
3. **Request for Quote Origin** – Ask for source or context.
4. **Formatted Quote Preview** – The bot shows the quote with these buttons:
    - ✅ **Confirm**: Post the quote to the group.
    - ✏️ **Edit**: Re-enter any part of the quote.
    - ❌ **Cancel**: Discard and return to the start.

## 🔐 Admin Middleware

The entire bot functionality is restricted to authorized administrators only. Access is granted exclusively to users whose Telegram user IDs are listed in the `ADMIN_IDS` environment variable. This ensures that only approved individuals can interact with the bot.

## 🗂️ Project Structure
```
├── src/
│ ├── app.ts # Entrypoint
│ ├── bot.ts # Bot instance and middleware
│ ├── config/env.ts # Environment variable validation
│ ├── constants.ts # Shared constants
│ ├── keyboards/ # UI keyboards for Telegram
│ ├── logger.ts # Pino logger setup
│ ├── modules/ # Command & middleware logic
│ ├── scenes/ # Scene handlers for multi-step flows
│ ├── types/ # Strong typing with custom models
│ └── utils/ # Helper functions (e.g. quote formatting)
├── public/messages.json # Message templates 
```

## 🛠️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/quote-bot-remake.git
cd quote-bot-remake
pnpm install
```

### 2. Set Up Environment

Create a `.env` file in the root directory with the following contents:

```env
BOT_TOKEN=your_telegram_bot_token
ADMIN_IDS=12345678/98765432
HOST_URL=https://your-public-url.com
PORT=8080
```

- `BOT_TOKEN`: Your bot token from BotFather
- `ADMIN_IDS`: Slash-separated list of Telegram user IDs who can access bot features
- `HOST_URL`: The public HTTPS URL where your bot is hosted (used for setting up webhooks)
- `PORT`: The port your Express server listens on

### 3. Run the Bot

```bash
pnpm dev
```

---




## 📄 License

This project is licensed under the **ISC License**.

