import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsMobilePhone, IsPhoneNumber } from 'class-validator';

class RequestOtpBody {
  @ApiProperty({required: true})
  @IsMobilePhone('en-IN', {strictMode: true})
  phno!: string;
}

@ApiTags('auth')
@Controller('otp')
export class OtpController {

  @Post('/')
  async requestOtp(@Body() reqOtp: RequestOtpBody) {
    Logger.log(JSON.stringify(reqOtp));
    return 'OTP SENT';
  }
}
