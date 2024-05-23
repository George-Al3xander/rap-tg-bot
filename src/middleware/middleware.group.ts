import { TBotContext } from "@/context/context.type"

export const groupMiddleware =
  (ids: string) => async (ctx: TBotContext, next: () => Promise<void>) => {
    const groupIds = ids.split("/")
    const { id } = await ctx.getChat()
    if (!groupIds.includes(id.toString())) {
      return await next()
    }
    
  }
