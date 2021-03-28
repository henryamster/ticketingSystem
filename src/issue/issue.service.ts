import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { Issue } from 'src/entities/issue.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class IssueService {
    constructor(
        @InjectRepository(Issue)
        private readonly issueRepository: Repository<Issue>,
      ) {}
    
      create(issue: Issue): Observable<Issue | Error> {

        if(issue.createdOn.getUTCDate() > new Date().getUTCDate()){
            return from([Error(`The date selected ${issue.createdOn.toLocaleDateString()}  ${issue.createdOn.toLocaleTimeString()} has not yet occured.`)])
        }

        return from(this.issueRepository.save(issue));
      }
    
      readAll(skipNumber = 0, takeNumber = 20): Observable<Issue[]> {
        return from(this.issueRepository.find())
          .pipe(skip(skipNumber), take(takeNumber));
      }
    
      readOne(id:number):Observable<Issue | Error> {
        return from(this.issueRepository
          .findOne(id))
        
      }
    
      update(issue: Issue): Observable<UpdateResult> {
        return from(this.issueRepository.update(
          issue.id,
          issue,
        ))
      }
    
      delete(issueId: number): Observable<DeleteResult> {
        return from(this.issueRepository.delete(issueId));
      }

}
