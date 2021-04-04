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
import { IssueController } from './issue/issue.controller';
import { IssueStatusService } from './issue-status/issue-status.service';
import { IssueStatusController } from './issue-status/issue-status.controller';
import { ApplicationWideSettings } from './app.config';

@Module({
  imports: [
    // connection string
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3301,
      database: 'weepEnd',
      username: 'root2',
      password: 'root',
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
  controllers: [
    AppController,
    ContactPersonController,
    IssueController,
    IssueStatusController,
  ],
  providers: [
    ApplicationWideSettings,
    AppService,
    ContactPersonService,
    IssueService,
    IssueStatusService,
  ],
})
export class AppModule { }
