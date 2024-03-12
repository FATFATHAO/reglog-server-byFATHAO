import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';


@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }
    async findUserByID(
        userWhereUniqueInputPrisma: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInputPrisma,
        });
    }
    async getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
    async getUserByEmail(email: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
    }
    async createUser(createUserInput: CreateUserInput): Promise<User> {
        return this.prismaService.user.create({ data:createUserInput as any });
    }
}
