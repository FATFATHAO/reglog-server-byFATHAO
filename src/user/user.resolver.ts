import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) { }
    @Query('user')
    async getUserByID(@Args('id') id: number) {
        return this.userService.findUserByID({ id: Number(id) });
    }
    @Query('users')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    @Query('getUserByEmail')
    async getUserByEmail(@Args('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
    @Mutation('addUser')
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }
}
