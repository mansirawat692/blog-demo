import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchAll, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
   

    constructor( 
        @InjectRepository(UserEntity) private readonly UserRepo:Repository<UserEntity> ,
        private authServ:AuthService
    ){}

    create(user:User):Observable<User>{
        return this.authServ.hashPassword(user.password).pipe(
            switchMap((passwordHash:string)=>{
                    const newUser=new UserEntity()
                    newUser.name=user.name
                    newUser.email=user.email
                    newUser.password=passwordHash

                    return from(this.UserRepo.save(newUser)).pipe(
                        map((user:User)=>{
                        const {password,...result}=user;
                        return result
                        }),
                        catchError(err=> throwError(err))
                    )
            })
        )
        //return from(this.UserRepo.save(user));
    }

    findAll():Observable<User[]>{
        
        return from(this.UserRepo.find()).pipe(
            map((user:User[])=>{
               user.forEach(function(v) {
                   delete v.password
               }); 
                return user
            })
        )

        //return from(this.UserRepo.find())
    }

    findOne(id: number): Observable<User>{
       
        return from(this.UserRepo.findOne(id)).pipe(
            map((user:User)=>{
                const{id,...result}=user;
                return result;
            })
        )

        // return from(this.UserRepo.findOne(id));
    }

    deleteOne(id:number):Observable<any>{
        return from(this.UserRepo.delete(id))
    }

    updateOne(id:number,user:User):Observable<any>{
        delete user.email;
        delete user.password;
        return from(this.UserRepo.update(id,user))
    }


    login(user:User):Observable<string>{
        return this.validateUser(user.email,user.password).pipe(
            switchMap((user:User)=>{
                if(user){
                    this.authServ.generateJWT(user).pipe(
                        map((jwt:string)=>jwt)
                    )
                }
                else{
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password:string):Observable<User>{
        return this.findMAil(email).pipe(
            switchMap((user:User)=>this.authServ.comparePassword(password, user.password).pipe(
                map((match : boolean)=>{
                    if(match){
                        const {password,...result}=user;
                        return result
                    }else{
                        throw Error;
                    }
                })
            ))
        )
    }

    findMAil(email:string):Observable<User>{
        return from(this.UserRepo.findOne(email));
    }
}
