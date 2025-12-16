import { projectsRouter } from '@/modules/projects/server/procedures';
import { createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/procedures';
import { usageRouter } from '@/modules/usages/server/procedures';

export const appRouter = createTRPCRouter({
  message: messagesRouter,
  projects: projectsRouter,
  usage:usageRouter
});
export type AppRouter = typeof appRouter;