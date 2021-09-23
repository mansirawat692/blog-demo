import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { from, map, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userServ:UserService){}

    @Post()
    create(@Body()user : User):Observable<User>{
        return from(this.userServ.create(user));
    }

    @Post(':login')
    login(@Body() user):Observable<Object>{
        return this.userServ.login(user).pipe(
            (map((jwt : string)=>{
                return {access_token : jwt}
            }))
        )
    }

    @Get()
    findAll(@Param() param):Observable<User[]>{
        return from(this.userServ.findAll());
    }

    @Get(':id')
    findOne(@Param() params):Observable<User>{
        return from(this.userServ.findOne(params.id));
    }


    @Delete(':id')
    deleteOne(@Param() params):Observable<User>{
        return from(this.userServ.deleteOne(params.id));
    }

    @Put(':id')
    updateOne(@Param() param,@Body() user:User):Observable<User>{
        return from(this.userServ.updateOne(param.id,user));
    }

}
