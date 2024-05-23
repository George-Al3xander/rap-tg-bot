import { WizardContext } from "@/types/type";
import { Middleware, Scenes, Telegraf } from "telegraf";

const { WizardScene } = Scenes;

export abstract class Scene extends WizardScene<any> {
  constructor(id: string, steps?: Middleware<any>[]) {
    steps = steps || [];
    if (steps.length > 0) {
      for (const step of steps) {
        //@ts-ignore
        step.register();
      }
      super(id, ...steps);
    } else {
      super(id);
    }
    this.id = id;
  }
  abstract registerTrigger(bot: Telegraf<WizardContext>): void;
}
