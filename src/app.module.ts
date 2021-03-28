import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactPerson } from './entities/contactperson.entity';
import { Issue } from './entities/issue.entity';
import { IssueStatus } from './entities/issuestatus.entity';
import { IssueTrail } from './entities/issuetrail.entity';
import { ResolutionAttempt } from './entities/resolutionattempt.entity';
import { ContactPersonService } from './contact-person/contact-person.service';
import { ContactPersonController } from './contact-person/contact-person.controller';
import { IssueService } from './issue/issue.service';


@Module({
  imports: [
    // connection string
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'weepEnd',
      username: 'root',
      password: 'hank1989',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      autoLoadEntities: true,
    }),

    // import entities
    TypeOrmModule.forFeature([
      ContactPerson,
      Issue,
      IssueStatus,
      IssueTrail,
      ResolutionAttempt,
    ]),
  ],
  controllers: [AppController, ContactPersonController],
  providers: [AppService, ContactPersonService, IssueService],
})
export class AppModule {}
