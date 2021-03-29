import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { isEmpty, map } from 'rxjs/operators';
import { IssueService } from './issue.service';
import { Issue } from './../entities/issue.entity';
import { ExceptionFactory } from './../exception-factory/exception-factory';
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  read(
    @Param('skip') skip = 0,
    @Param('take') take = 20,
  ): Observable<Issue[] | HttpException> {
    return (
      this.issueService
        .readAll(skip, take)
        //handle no results found
        .pipe(
          map((stream) =>
            !isEmpty()
              ? ExceptionFactory({
                  status: `Empty Result Set`,
                  success: false,
                  message: `No issues found.`,
                  code: 200,
                })
              : stream,
          ),
        )
    );
  }

  @Get(':id')
  readOne(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<Issue | HttpException> {
    return (
      this.issueService
        .readOne(+id)
        //handle no results found
        .pipe(
          map((stream) =>
            stream != null
              ? stream
              : ExceptionFactory({
                  status: `Empty Result Set`,
                  success: false,
                  message: `No issue with id ${id}.`,
                  code: 200,
                }),
          ),
        )
    );
  }

  @Post('create')
  create(@Body() issue: Issue): Observable<any> {
    if (issue.createdOn.getUTCDate() > new Date().getUTCDate()) {
      return from([
        ExceptionFactory({
          status: 'Empty Result Set',
          success: false,
          message: `The date selected ${issue.createdOn.toLocaleDateString()}  ${issue.createdOn.toLocaleTimeString()} has not yet occured.`,
          code: 200,
        }),
      ]);
    }
    return this.issueService.create(issue);
  }

  @Put(':id/update')
  update(@Param('id') id, @Body() issue: Issue): Observable<any> {
    issue.id = Number(id);
    return this.issueService.update(issue);
  }

  @Delete(':id/delete')
  delete(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.issueService.delete(+id);
  }
}
