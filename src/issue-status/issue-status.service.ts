import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { IssueStatus } from 'src/entities/issuestatus.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class IssueStatusService {
    constructor(
        @InjectRepository(IssueStatus)
        private readonly issueStatusRepository: Repository<IssueStatus>,
    ) { }

    create(issueStatus: IssueStatus): Observable<IssueStatus | Error> {
        return from(this.issueStatusRepository.save(issueStatus));
    }

    readAll(skipNumber = 0, takeNumber = 20): Observable<IssueStatus[]> {
        return from(this.issueStatusRepository.find())
            .pipe(skip(skipNumber), take(takeNumber));
    }

    readOne(id: number): Observable<IssueStatus> {
        return from(this.issueStatusRepository
            .findOne(id))

    }

    update(issueStatus: IssueStatus): Observable<UpdateResult> {
        return from(this.issueStatusRepository.update(
            issueStatus.id,
            issueStatus,
        ))
    }

    delete(issueId: number): Observable<DeleteResult> {
        return from(this.issueStatusRepository.delete(issueId));
    }

}
