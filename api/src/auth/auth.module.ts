import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './guard/jet-stratergy';
import { JwtAuthGuard } from './guard/jwt-guard';
import { RolesGuard } from './guard/roles.guard';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/service/user.service';

@Module({
    imports:[
        forwardRef(()=>UserModule),
       JwtModule.registerAsync({
           imports:[ConfigModule],
           inject:[ConfigService],
           useFactory:async (configServ:ConfigService)=>({
               secret:configServ.get('JWT_SECRET'),
               signOptions:{expiresIn:'100s'}

           })
       })
    ],
    providers: [AuthService,JwtStrategy,JwtAuthGuard,RolesGuard],
    exports: [AuthService]
})
export class AuthModule {}
