import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt=require('bcrypt')

@Injectable()
export class AuthService {
constructor( private readonly jwtServ:JwtService){}

generateJWT(user:User):Observable<string>{
    return from(this.jwtServ.signAsync(user))
}

hashPassword(password:string):Observable<string>{
    return from<string>(bcrypt.hash(password,12))
}

comparePassword(newPassword:string,hashPassword:string):Observable<any | boolean>{
    return from<any | boolean>(bcrypt.compare(newPassword,hashPassword))
}
}
