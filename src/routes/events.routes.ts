import { Router } from 'express';
import { getRepository } from 'typeorm';
import Event from '../entities/Event';
import CreateEventService from '../services/CreateEventsService';

const eventsRouter = Router();

eventsRouter.get('/', async (request, response) => {
  const eventsRepository = getRepository(Event);

  const events = await eventsRepository.find();
  return response.json(events);
});

eventsRouter.post('/', async (request, response) => {
  try {
    const {
      title,
      description,
      place,
      dateEvent,
      deadline,
      minimumAge,
      maximumQuantity,
      user,
    } = request.body;

    const createEvent = new CreateEventService();

    const event = await createEvent.execute({
      title,
      description,
      place,
      dateEvent,
      deadline,
      minimumAge,
      maximumQuantity,
      user,
    });
    return response.json(event);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default eventsRouter;
