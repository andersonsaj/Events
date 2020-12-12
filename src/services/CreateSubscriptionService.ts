import { getRepository } from 'typeorm';
import nodemailer from 'nodemailer';
import Event from '../entities/Event';
import Subscription from '../entities/subscription';
import AppError from '../errors/AppError';
import authEmail from '../config/authEmail';

interface Request {
  name: string;
  cpf: string;
  email: string;
  event: string;
  birthDate: Date;
}

class CreateSubscriptionService {
  public async execute({
    name,
    cpf,
    email,
    event,
    birthDate,
  }: Request): Promise<Subscription> {
    const subscriptionRepository = getRepository(Subscription);
    const eventRepository = getRepository(Event);

    const subscriptionEvent = await eventRepository.findOne({
      where: {
        id: event,
      },
    });

    const { quantity } = await subscriptionRepository
      .createQueryBuilder('subscriptions')
      .select('count(*)', 'quantity')
      .where('event_id = :id', { id: event })
      .getRawOne();

    const maxQuantity = subscriptionEvent?.maximumQuantity;

    if (maxQuantity !== undefined) {
      if (quantity >= maxQuantity) {
        throw new AppError('O número de vagas acabou!!');
      }
    }

    const currentDate = Date.now();
    const LimitDate = subscriptionEvent?.deadline as Date;

    if (currentDate >= Date.parse(LimitDate.toISOString())) {
      throw new AppError('Inscrição encerrada');
    }

    const age = subscriptionEvent?.minimumAge;

    const birth = new Date(birthDate);

    const current = new Date();

    let idade = current.getFullYear() - birth.getFullYear();
    const mesNasc = birth.getMonth() + 1;
    const mesAtual = current.getMonth() + 1;
    const diaNasc = birth.getDate() + 1;
    const diaAtual = current.getDate();

    if (mesAtual <= mesNasc && diaAtual > diaNasc) {
      idade -= 1;
    }

    if (age !== undefined) {
      if (age > idade) {
        throw new AppError('Sua idade é menor que à permitida no event');
      }
    }

    const subscription = subscriptionRepository.create({
      name,
      cpf,
      email,
      event: subscriptionEvent,
      birthDate,
    });

    await subscriptionRepository.save(subscription);

    const transport = nodemailer.createTransport({
      host: authEmail.email.host,
      port: authEmail.email.port,
      secure: authEmail.email.secure,
      auth: authEmail.email.auth,
    });

    transport
      .sendMail({
        from: authEmail.email.auth.user,
        to: email,
        subject: 'Olá, aqui é a Companhia de Eventos',
        text: `Inscrição no evento ${subscriptionEvent?.title} realizada com sucesso `,
      })
      .then(message => {
        console.log(message);
      })
      .catch(err => {
        console.log(err);
      });

    return subscription;
  }
}

export default CreateSubscriptionService;
