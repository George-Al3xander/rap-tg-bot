import { ErrorHandler } from "./error-handler";
import { AdminGuard } from "./admin-guard";

export const middleware = [new ErrorHandler(), new AdminGuard()];
