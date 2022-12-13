import { router } from "../trpc";
import { exampleRouter } from "./example";
import { groceryRouter } from "./router";

export const appRouter = router({
  example: exampleRouter,
  groceryRouter: groceryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
