import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { IsMobilePhone, IsNumberString, IsUUID, Length } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

class OtpSendBody {
  @ApiProperty({required: true, example: '+918800233266'})
  @IsMobilePhone('en-IN', {strictMode: true})
  phno!: string;

}

@ApiResponse({})
class OtpSendResponse extends OtpSendBody {

  @ApiResponseProperty({example: '1ee7cb89-7465-4872-914f-783a06911927'})
  @IsUUID()
  nonce!: string;

  constructor(phno: string, nonce: string) {
    super();
    this.phno = phno;
    this.nonce = nonce;
  }
}

class OtpVerifyBody extends OtpSendResponse {
  @ApiProperty({required: true, example: '0000'})
  @Length(4, 4)
  @IsNumberString()
  otp!: string
}

@ApiResponse({})
class OtpVerifyResponse {
  @ApiResponseProperty()
  accessToken!: string
  isNewUser!: boolean

}

@ApiTags('auth')
@Controller('otp')
export class OtpController {

  @ApiCreatedResponse({type: OtpSendResponse})
  @Post('/')
  async requestOtp(@Body() reqOtp: OtpSendBody): Promise<OtpSendResponse> {
    Logger.log(JSON.stringify(reqOtp), 'OTP_SEND');
    return new OtpSendResponse(
      reqOtp.phno,
      uuid4().toString()
    );
  }

  @Post('/verify')
  async verifyOtp(@Body() otpVerify: OtpVerifyBody): Promise<void> {

  }
}
