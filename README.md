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
│   ├── app.ts                       # Bot bootstrapper — wires middleware, plugins, scenes, and modules together
│   ├── bot.ts                       # Bot instance, middleware, and handlers
│   ├── constants.ts                 # Centralized action and conversation IDs used across scenes and handlers
│   ├── logger.ts                    # Pino logger configuration
│   ├── modules/
│   │   ├── index.ts
│   │   ├── middleware/
│   │   │   ├── admin-guard.ts         # Middleware to restrict access to admins
│   │   │   ├── error-handler.ts       # Global error handling middleware
│   │   │   └── index.ts
│   │   ├── plugins/
│   │   │   ├── conversation-orchestrator.ts # Sets up scene flow
│   │   │   ├── index.ts
│   │   │   └── session.ts             # Session middleware setup
│   │   └── quotes/
│   │       ├── cancel-quote.ts       # Handler to cancel a quote submission
│   │       ├── confirm-quote.ts      # Handler to confirm and finalize a quote
│   │       ├── edit-quote.ts         # Handler to edit a specific quote field
│   │       └── index.ts
│   ├── scenes/
│   │   ├── index.ts                  
│   │   ├── base-scene.ts             # Base class abstraction for all scenes
│   │   ├── intro-scene.ts            # First interaction scene (/start)
│   │   ├── quote-decision-scene.ts   # Scene where user chooses to confirm/edit/cancel
│   │   ├── quote-field-scenes.ts     # Scenes to collect individual fields (text, author, origin)
│   │   └── scene-composer.ts         # Helper to build complex scenes from smaller parts
│   ├── types/                        # Strong typing with custom models
│   │   └── models/
│   │       ├── bot-context.ts        # Custom context interface for grammY
│   │       ├── bot-module.ts         # Interface for modular bot components
│   │       ├── framework-bot.ts      # Wrapper types for bot init or composition
│   │       ├── index.ts              # Export all model types
│   │       ├── quote.ts              # Quote structure (text, author, origin, etc.)
│   │       └── session-data.ts       # Session structure for conversations
│   └── utils/                        # Helper functions
│       ├── cachedMessage.ts          # Utilities for caching, editing, deleting messages in session
│       └── format-quote-html.ts      # Formats a quote object to HTML-styled message
├── public/
│   └── messages.json                 # Static bot messages and templates
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

