import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';

export const appRouter = createTRPCRouter({
  message: messagesRouter,
});
export type AppRouter = typeof appRouter;