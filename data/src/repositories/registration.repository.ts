import { AbstractRepository, DeepPartial, EntityRepository, FindManyOptions } from 'typeorm';
import { Registration } from '../entities/registration.entity';

export class AlreadyRegisteredError extends Error {
  name = 'EMAIL_ALREADY_REGISTERED';
}

@EntityRepository(Registration)
export class RegistrationRepository extends AbstractRepository<Registration> {

  async register(registration: DeepPartial<Registration>): Promise<Registration> {
    const email = await this.repository.findOne({
      where: {
        email: registration.email
      }
    });
    if (email) throw new AlreadyRegisteredError();
    return await this.repository.save(registration);
  }
}
