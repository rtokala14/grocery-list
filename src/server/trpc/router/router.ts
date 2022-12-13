import { z } from 'zod'
import { router, publicProcedure } from "../trpc";

export const groceryRouter = router({
    findAll: publicProcedure
        .query(({ ctx}) => {
            return ctx.prisma.groceryList.findMany()
        }),
    insertOne: publicProcedure
        .input(
            z.object({
                title: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.groceryList.create({
                data: {
                    title: input.title
                }
            })
        }),
    updateOne: publicProcedure
        .input(
            z.object({
                id: z.number(),
                title: z.string(),
                checked: z.boolean(),
            })
        )
        .mutation(({ ctx,input }) => {
            const { id, ...rest } = input

            return ctx.prisma.groceryList.update({
                where: {id},
                data: { ...rest }
            })
        }),
    deleteAll: publicProcedure
        .input(
            z.object({
                ids: z.number().array()
            })
        )
        .mutation(({ ctx, input }) => {
            const { ids } = input

            return ctx.prisma.groceryList.deleteMany({
                where: {
                    id: {
                        in: ids,
                    }
                }
            })
        }),
    deleteOne: publicProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .mutation(({ ctx, input }) => {
            const { id } = input

            return ctx.prisma.groceryList.delete({
                where: {
                    id: id
                }
            })
        })
})