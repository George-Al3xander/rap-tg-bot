
  

# Quote Bot 

  

  

## Overview

  

  

Quote Bot is a Telegram bot designed to collect and share the best quotes. Users can submit quotes, specify the author, and provide additional information about the quote (such as the source). The bot ensures all aspects of the quote are provided and allows users to edit their submissions if needed. After formatting the quote, the bot presents it to the user with three buttons: Confirm, Edit, and Cancel.

  

  

## Features

  

  

- Submit quotes

  

- Specify the author of the quote

  

- Provide additional information about the quote

  

- Edit any aspect of the submitted quotes through actions

  

- Validate input lengths to ensure quality

  

- Admin middleware protection

  

- Middleware for locally stored sessions

  

  

## Bot Commands

  

  

### Start the Bot

  

-  **Command:**  `/start`

  

-  **Description:** Initiates the bot and prompts the user to share their quote.

  

  

### Submit a Quote

  

1.  **Request for Quote Text:**

  

-  **Description:** Prompt the user to share their quote.

  

2.  **Request for Author Name:**

  

-  **Description:** Ask the user to provide the name of the author of the quote.

  

  

3.  **Request for Quote Origin:**

  

-  **Description:** Ask the user to specify additional information about the quote, such as the source.

  

  

### Quote Formatting

  

-  **Confirmation:** After formatting the quote, the bot presents it to the user with the following options:

  

-  **Confirm:** Posts the formatted quote to a specified Telegram group.

  

-  **Edit:** Allows the user to edit any aspect of the quote.

  

-  **Cancel:** Deletes the quote and returns to the welcome message.

  

  

### Admin Middleware Protection

  

The bot includes middleware protection to ensure that only authorized administrators can perform certain actions, such as deleting quotes or accessing sensitive information.

  

  

### Middleware for Locally Stored Sessions

  

The bot utilizes telegraf-session-local middleware for locally stored sessions and database. This enables efficient management of user sessions and provides a mechanism for storing and retrieving data within the bot.

  

  

## Installation and Setup

  

  

1.  **Clone the repository:**

  

```bash
git clone  https://github.com/yourusername/quote-bot.git
cd quote-bot
```

  

2.  **Install dependencies:**

  

```bash
npm install
```

  

3.  **Create the environment file:**

  

- Create a `.env` file in the root directory of the project.

  

  

4.  **Configure the environment file:**

  

- Add the following variables to the `.env` file:

  

```
BOT_TOKEN=your-telegram-bot-token

ADMIN_ID=admin_id1/admin_id2/admin_id3 # Replace with admin IDs separated by "/" 

GROUP_ID=your-telegram-group-id
```