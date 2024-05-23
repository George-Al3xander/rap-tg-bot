import { TBotContext } from "@/context/context.type"

export const adminMiddleWare =
  (ids: string) => async (ctx: TBotContext, next: () => Promise<void>) => {
    const adminIDs = ids.split("/")
    const { id } = await ctx.getChat()
    if (adminIDs.includes(id.toString())) {      
      return await next()
    }
    await ctx.replyWithHTML(
      "<b>Access Denied🔴</b>\n\nSorry, you do not have permission to perform this action."
    )
  }
