import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsUUID} from 'class-validator';
import { RegistrationService } from '../database/registration/registration.service';

class RegisterSendBody {
  @ApiProperty({required: true, example: 'abc@codeblitz.app'})
  @IsEmail()
  email!: string;

}

class RegistrationCompleteResponse {
  @ApiProperty({required: true, example: 'Registration is completed.'})
  @IsUUID()
  message!: string

  constructor(message: string) {
    this.message = message;
  }
}



@ApiTags('registration')
@Controller('register')
export class RegisterController {
  @Inject() private readonly registration!: RegistrationService

  @ApiCreatedResponse({type: RegistrationCompleteResponse})
  @Post('/')
  async register(@Body() register: RegisterSendBody): Promise<RegistrationCompleteResponse> {
    await this.registration.registerEmail(register);
    return new RegistrationCompleteResponse("Hello")
  }
}
