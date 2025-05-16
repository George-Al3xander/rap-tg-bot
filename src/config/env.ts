import { cleanEnv, str, url, port } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
    PORT: port({ default: 3000 }),
    BOT_TOKEN: str(),
    ADMIN_ID: str(),
    GROUP_ID: str(),
    HOST_URL: url(),
});
