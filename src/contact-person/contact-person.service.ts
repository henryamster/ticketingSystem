import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, QueryBuilder } from 'typeorm';
import { ContactPerson } from './../entities/contactperson.entity';
import { catchError, map, skip, take, tap } from 'rxjs/operators';
import { from, noop, Observable, of, pipe } from 'rxjs';
@Injectable()
export class ContactPersonService {
  constructor(
    @InjectRepository(ContactPerson)
    private readonly contactPersonRepository: Repository<ContactPerson>,
    //private readonly querybuilder:QueryBuilder<ContactPerson>,
  ) { }

  create(contactPerson: ContactPerson): Observable<ContactPerson> {
    return from(this.contactPersonRepository.save(contactPerson));
  }

  readAll(skipNumber = 0, takeNumber = 20): Observable<ContactPerson[]> {

    return from(this.contactPersonRepository.find())
      .pipe(skip(skipNumber), take(takeNumber));
  }

  readOne(id: number): Observable<ContactPerson | Error> {

    const lookupPerson = this.contactPersonRepository
      .createQueryBuilder("contactPerson")
      .where(`contactPerson.id = :id, {id:${id}}`).getOneOrFail()
      .then(
        ()=>this.contactPersonRepository.findOne(id),
        ()=>Error(`Could not retrieve Contact Person with ID" ${id}: No contact person exists.`)
      
      )
    return from(lookupPerson)

  }

  update(contactPerson: ContactPerson): Observable<UpdateResult> {
    return from(this.contactPersonRepository.update(
      contactPerson.id,
      contactPerson,
    ))
  }

  delete(contactPersonId: number): Observable<DeleteResult> {
    return from(this.contactPersonRepository.delete(contactPersonId));
  }
}
