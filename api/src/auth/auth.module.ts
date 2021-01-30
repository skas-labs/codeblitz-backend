import { Module } from '@nestjs/common';
import { OtpController } from './otp/otp.controller';

@Module({
  controllers: [OtpController]
})
export class AuthModule {}
