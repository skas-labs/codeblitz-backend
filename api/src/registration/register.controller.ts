import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsUUID} from 'class-validator';
import { PlayersService } from '../database/players/players.service';

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
  @Inject() private readonly players!: PlayersService

  @ApiCreatedResponse({type: RegistrationCompleteResponse})
  @Post('/')
  async register(@Body() register: RegisterSendBody): Promise<RegistrationCompleteResponse> {
    return new RegistrationCompleteResponse("Hello")
  }
}
