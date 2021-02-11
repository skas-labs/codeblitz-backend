import { Global, Module } from '@nestjs/common';
import { OtpController } from './otp/otp.controller';

@Global()
@Module({
  controllers: [OtpController]
})
export class AuthModule {}
