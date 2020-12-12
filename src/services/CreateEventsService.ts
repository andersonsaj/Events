import { getRepository } from 'typeorm';
import Event from '../entities/Event';
import User from '../entities/User';

interface Request {
  title: string;
  description: string;
  place: string;
  dateEvent: Date;
  deadline: Date;
  minimumAge: number;
  maximumQuantity: number;
  user: string;
}

class CreateEventService {
  public async execute({
    title,
    description,
    place,
    dateEvent,
    deadline,
    minimumAge,
    maximumQuantity,
    user,
  }: Request): Promise<Event> {
    const eventsRepository = getRepository(Event);
    const userRepository = getRepository(User);

    const eventUser = await userRepository.findOne({
      where: {
        id: user,
      },
    });

    const event = eventsRepository.create({
      title,
      description,
      place,
      dateEvent,
      deadline,
      minimumAge,
      maximumQuantity,
      user: {
        id: eventUser?.id,
        name: eventUser?.name,
        email: eventUser?.email,
      },
    });
    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;
