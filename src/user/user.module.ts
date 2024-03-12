import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService,UserService,UserResolver],
})
export class UserModule {}
