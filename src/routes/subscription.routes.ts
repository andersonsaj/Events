import { Router } from 'express';
import { getRepository } from 'typeorm';
import 'express-async-errors';
import Subscription from '../entities/subscription';
import CreateSubscriptionService from '../services/CreateSubscriptionService';
import AppError from '../errors/AppError';

const subscriptionRouter = Router();

subscriptionRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const repository = getRepository(Subscription);

    const subscription = await repository.find({
      where: { event_id: id },
    });

    return response.json(subscription);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

subscriptionRouter.post('/', async (request, response) => {
  try {
    const { name, cpf, email, event, birthDate } = request.body;

    const createSubscription = new CreateSubscriptionService();

    const subscription = await createSubscription.execute({
      name,
      cpf,
      email,
      event,
      birthDate,
    });

    return response.json(subscription);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default subscriptionRouter;
