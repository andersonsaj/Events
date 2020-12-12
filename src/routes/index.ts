import { Router } from 'express';
import eventsRouter from './events.routes';
import sessionsRouter from './sessions.routes';
import subscriptionRouter from './subscription.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/events', eventsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/subscriptions', subscriptionRouter);

export default routes;
