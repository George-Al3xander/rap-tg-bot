import { SceneStep } from "@/scenes/step/step.class"
import { CTXFunc } from "@/types/type"


export class StartWizard extends SceneStep {
  validationMiddleware?: unknown
  constructor() {
    super()
  }
  register() {
    this.action("suggest", async (ctx) => {
      await ctx.reply("Give us a quote")
      return ctx.wizard.next()
    })
  }
}

export class QuoteStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }

  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply("Give us the author")
        return ctx.wizard!.next()
      })
    )
  }
}

export class AuthorStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }
  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.reply("Give us the song name")
        return ctx.wizard!.next()
      })
    )
  }
}

export class SongNameStep extends SceneStep {
  validationMiddleware: (...fns: CTXFunc[]) => CTXFunc[]
  constructor(val: (...fns: CTXFunc[]) => CTXFunc[]) {
    super()
    this.validationMiddleware = val
  }
  register() {
    this.on(
      "text",
      //@ts-ignore
      ...this.validationMiddleware(async (ctx) => {
        await ctx.scene.leave()
        return ctx.scene.enter("quote_decision")
      })
    )
  }
}

// new - nodemon --ignore session.json -e ts,js --exec ts-node -r tsconfig-paths/register ./src/app.ts
//prev -  nodemon   --ignore session.json ./src/app.ts
