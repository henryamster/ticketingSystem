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
import { Observable } from 'rxjs';
import { isEmpty, map, tap } from 'rxjs/operators';
import { IssueStatus } from 'src/entities/issuestatus.entity';
import { IssueStatusService } from './issue-status.service';
import { ExceptionFactory } from './../exception-factory/exception-factory';


@Controller('issue-status')
export class IssueStatusController {
    constructor(private issueStatusService: IssueStatusService) { }

    @Get()
    read(
        @Param('skip') skip = 0,
        @Param('take') take = 20,
    ): Observable<IssueStatus[] | HttpException> {

        return this.issueStatusService.readAll(skip, take)
            //handle no results found
            .pipe(
                map(stream => !isEmpty() ?
                    ExceptionFactory(
                        {
                            status: `Empty Result Set`,
                            success: false,
                            message: `No issue statuses found.`,
                            code: 200
                        }) : stream)

            )
    }

    @Get(':id')
    readOne(@Param('id', ParseIntPipe) id: number): Observable<IssueStatus | HttpException> {
        return this.issueStatusService.readOne(+id)
            //handle no results found
            .pipe(
                map(stream => stream != null ?
                    stream :
                    ExceptionFactory(
                        {
                            status: `Empty Result Set`,
                            success: false,
                            message: `No issue status with id ${id}.`,
                            code: 200
                        }
                    ))
            )
    }

    @Post('create')
    create(@Body() issueStatus: IssueStatus): Observable<any> {
        return this.issueStatusService.create(issueStatus)
    }

    @Put(':id/update')
    update(@Param('id') id, @Body() contact: IssueStatus): Observable<any> {
        contact.id = Number(id);
        return this.issueStatusService.update(contact)
    }

    @Delete(':id/delete')
    delete(@Param('id', ParseIntPipe) id: number): Observable<any> {
        return this.issueStatusService.delete(+id)
    }
}