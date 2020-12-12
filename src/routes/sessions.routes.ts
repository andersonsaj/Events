import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { userSession, token } = await authenticateUser.execute({
    email,
    password,
  });

  const user = {
    id: userSession.id,
    name: userSession.name,
    email: userSession.email,
    created_at: userSession.created_at,
    updated_at: userSession.updated_at,
  };

  return response.json({ user, token });
});

export default sessionsRouter;
