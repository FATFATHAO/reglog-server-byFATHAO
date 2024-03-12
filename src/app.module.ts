import { Module } from '@nestjs/common'; import { AppController } from './app.controller'; import { AppService } from './app.service'; import { ConfigModule, ConfigService } from '@nestjs/config'; import { PrismaModule } from 'nestjs-prisma'; import { async } from 'rxjs'; import { UserModule } from './user/user.module'; import { GraphQLModule } from '@nestjs/graphql'; import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
@Module({     imports: [ConfigModule.forRoot({         isGlobal: true,         envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',     }),         PrismaModule.forRootAsync({             isGlobal: true,             useFactory: async (configService: ConfigService) => {                 // 查看是否符合预期                 //console.log(configService.get('DATABASE_URL'));                 return {                     prismaOptions: {                         datasources: {                             db: {                                 url: configService.get('DATABASE_URL'),                             },                         },                     },                     explicitConnect: false,                 };             },             inject: [ConfigService],         }),         UserModule,         GraphQLModule.forRoot<ApolloDriverConfig>({             driver: ApolloDriver,
            typePaths: ['src/user/user.graphql'],
            installSubscriptionHandlers: true,
            definitions: {
                path:join(process.cwd(),'src/graphql.schema.ts'),
            },
            playground: true,
        }),     ],     //controllers: [AppController],     //providers: [AppService], }) export class AppModule { } 