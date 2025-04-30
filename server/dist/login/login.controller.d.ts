import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    create(loginDto: LoginDto): import("./model/login.model").LoginModel;
}
