import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserService } from "src/user/service/user.service";
import { UserModule } from "src/user/user.module";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private ref:Reflector,
        @Inject(forwardRef(()=>UserService))
        private userServ:UserService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const roles=this.ref.get<string[]>('roles',context.getHandler());
   if(!roles){
       return true
   }
   const request=context.switchToHttp().getRequest();
   console.log(request);
   const user=request.user;
   return true;
  }
}