import { Inject, Injectable } from '@nestjs/common';
import { Database } from '../database.provider';
import { User } from '@codeblitz/data/dist/entities/user.entity';
import { Lazy } from '../../utils/lazy.decorator';
import { RegistrationRepository } from '@codeblitz/data/dist/repositories/registration.repository';

@Injectable()
export class RegistrationService {
  @Inject() private readonly database!: Database;

  @Lazy<RegistrationService>(c => c.database.repos.registration)
  private repo!: RegistrationRepository;

  async registerEmail(email: string){
    return await this.repo.register({email})
  }

}
