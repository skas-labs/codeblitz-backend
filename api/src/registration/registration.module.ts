import { Global, Module } from '@nestjs/common';
import { RegisterController } from './register.controller';

@Global()
@Module({
  controllers: [RegisterController]
})
export class RegistrationModule {}
