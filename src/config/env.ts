import { cleanEnv, num, str, url } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
    BOT_TOKEN: str(),
    ADMIN_IDS: str(),
    GROUP_ID: str(),
    HOST_URL: url(),
    PORT: num(),
});
