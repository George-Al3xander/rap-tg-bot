import { SceneStep } from "../step/step.class";

export class IntroInitialStep extends SceneStep {
  validationMiddleware?: unknown;
  register(): void {
    this.on("text", (ctx) => ctx.scene.leave());
  }
}
