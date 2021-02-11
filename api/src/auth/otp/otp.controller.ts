import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { IsMobilePhone, IsNumberString, IsUUID, Length } from 'class-validator';
import { v4 as uuid4 } from 'uuid';
import { UsersService } from '../../database/users/users.service';

class OtpSendBody {
  @ApiProperty({required: true, example: '+918800233266'})
  @IsMobilePhone('en-IN', {strictMode: true})
  phno!: string;

}

@ApiResponse({})
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

@ApiResponse({})
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

  @Inject() private readonly users!: UsersService;


  @ApiCreatedResponse({type: OtpSendResponse})
  @Post('/')
  async requestOtp(@Body() reqOtp: OtpSendBody): Promise<OtpSendResponse> {
    Logger.debug(JSON.stringify(reqOtp), 'OTP_SEND');
    return new OtpSendResponse(
      reqOtp.phno,
      uuid4().toString()
    );
  }

  @Post('/verify')
  async verifyOtp(@Body() otpVerify: OtpVerifyBody): Promise<OtpVerifyResponse> {
    Logger.debug(JSON.stringify(otpVerify), 'OTP_VERIFY');
    const [ user, isNewUser ] = await this.users.findOrCreate(otpVerify.phno);
    return new OtpVerifyResponse(
      uuid4().toString(),
      isNewUser
    );
  }
}
