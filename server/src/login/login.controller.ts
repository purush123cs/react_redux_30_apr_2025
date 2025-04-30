import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() loginDto: LoginDto) {
    console.log("Entered LoginController.create:"+JSON.stringify(loginDto));
    return this.loginService.create(loginDto);
  }

}
