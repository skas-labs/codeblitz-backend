import { Global, Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';

@Global()
@Module({
  controllers: [RegistrationController]
})
export class RegistrationModule {}
