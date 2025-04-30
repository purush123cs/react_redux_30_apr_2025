import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginModel } from './model/login.model';

@Injectable()
export class LoginService {

  create(loginDto: LoginDto): LoginModel {
    const loginModel = new LoginModel();
    loginModel.status = 'success';
    return loginModel;
  }
  
}
