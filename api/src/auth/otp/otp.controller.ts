import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { IsMobilePhone, IsNumberString, IsUUID, Length } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

class OtpSendBody {
  @ApiProperty({required: true, example: '+918800233266'})
  @IsMobilePhone('en-IN', {strictMode: true})
  phno!: string;

}

class OtpSendResponse extends OtpSendBody {

  @ApiProperty({required: true, example: '1ee7cb89-7465-4872-914f-783a06911927'})
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
  otp!: string;
}

class OtpVerifyResponse {
  @ApiResponseProperty()
  accessToken!: string;
  @ApiResponseProperty()
  isNewUser!: boolean;


  constructor(accessToken: string, isNewUser = false) {
    this.accessToken = accessToken;
    this.isNewUser = isNewUser;
  }
}

@ApiTags('auth')
@Controller('otp')
export class OtpController {

  @ApiCreatedResponse({type: OtpSendResponse})
  @Post('/')
  async requestOtp(@Body() reqOtp: OtpSendBody): Promise<OtpSendResponse> {
    Logger.debug(JSON.stringify(reqOtp), 'OTP_SEND');

    return new OtpSendResponse(
      reqOtp.phno,
      uuid4().toString()
    );
  }

  @ApiResponse({type: OtpVerifyResponse})
  @Post('/verify')
  async verifyOtp(@Body() otpVerify: OtpVerifyBody): Promise<OtpVerifyResponse> {
    Logger.debug(JSON.stringify(otpVerify), 'OTP_VERIFY')
    return new OtpVerifyResponse(
      uuid4().toString(),
      true
    );
  }
}
