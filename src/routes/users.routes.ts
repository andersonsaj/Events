import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const userResponse = await createUser.execute({
      name,
      email,
      password,
    });

    const user = {
      id: userResponse.id,
      name: userResponse.name,
      email: userResponse.email,
      created_at: userResponse.created_at,
      updated_at: userResponse.updated_at,
    };

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
