import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth/auth.service';

@Module({
    imports:[
       JwtModule.registerAsync({
           imports:[ConfigModule],
           inject:[ConfigModule],
           useFactory:async (configServ:ConfigService)=>({
               secret:configServ.get('JWT_SECRET'),
               signOptions:{expiresIn:'100s'}

           })
       })
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
