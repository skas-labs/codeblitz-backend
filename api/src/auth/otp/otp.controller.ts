import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { IsMobilePhone, IsUUID } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

class RequestOtpBody {
  @ApiProperty({required: true, example: '+918800233266'})
  @IsMobilePhone('en-IN', {strictMode: true})
  phno!: string;

}

@ApiResponse({})
class OtpSendResponseBody extends RequestOtpBody {

  @ApiResponseProperty({example: '1ee7cb89-7465-4872-914f-783a06911927'})
  @IsUUID()
  nonce!: string;

  constructor(phno: string, nonce: string) {
    super();
    this.phno = phno;
    this.nonce = nonce;
  }
}

@ApiTags('auth')
@Controller('otp')
export class OtpController {

  @ApiCreatedResponse({type: OtpSendResponseBody})
  @Post('/')
  async requestOtp(@Body() reqOtp: RequestOtpBody): Promise<OtpSendResponseBody> {
    Logger.log(JSON.stringify(reqOtp), 'OTP_SEND');
    return new OtpSendResponseBody(
      reqOtp.phno,
      uuid4().toString()
    );
  }
}
