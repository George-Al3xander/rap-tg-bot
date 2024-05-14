import { DotenvParseOutput, config } from "dotenv";
import { TConfigService } from "./config.type";

export class ConfigService implements TConfigService {
    private config: DotenvParseOutput;
    constructor() {
        const {error, parsed} = config()
        if(error) {
            throw new Error("Couldn't found an environment file")
        }
        if(!parsed) {
            throw new Error("Environment is empty")
        }

        this.config = parsed;
    }
    get(key: string): string {
        const value = this.config[key]
        if(!value) {
            throw new Error("Couldn't next key: " + key)
        }
        return value
    }
}