import { Session } from "./session";
import { ConversationOrchestrator } from "./conversation-orchestrator";

export const plugins = [new Session(), new ConversationOrchestrator()];
