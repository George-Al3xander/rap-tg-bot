import { cleanEnv, str } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
    BOT_TOKEN: str(),
    ADMIN_IDS: str(),
});
