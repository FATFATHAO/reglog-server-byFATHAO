import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}

