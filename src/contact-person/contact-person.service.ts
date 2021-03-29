import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, QueryBuilder } from 'typeorm';
import { ContactPerson } from './../entities/contactperson.entity';
import {
  catchError,
  defaultIfEmpty,
  isEmpty,
  map,
  skip,
  take,
  tap,
} from 'rxjs/operators';
import { from, noop, Observable, of, pipe, throwError } from 'rxjs';
@Injectable()
export class ContactPersonService {
  constructor(
    @InjectRepository(ContactPerson)
    private readonly contactPersonRepository: Repository<ContactPerson>,
  ) {}

  create(contactPerson: ContactPerson): Observable<ContactPerson> {
    return from(this.contactPersonRepository.save(contactPerson));
  }

  readAll(skipNumber: number, takeNumber: number): Observable<ContactPerson[]> {
    return from(
      this.contactPersonRepository.find({
        skip: skipNumber,
        take: takeNumber,
      }),
    );
  }

  readOne(id: number): Observable<ContactPerson> {
    return from(this.contactPersonRepository.findOne(+id));
  }

  update(contactPerson: ContactPerson): Observable<UpdateResult> {
    return from(
      this.contactPersonRepository.update(contactPerson.id, contactPerson),
    );
  }

  delete(contactPersonId: number): Observable<DeleteResult> {
    return from(this.contactPersonRepository.delete(contactPersonId));
  }

  async checkIfExists(id: number): Promise<boolean> {
    return (
      (await this.contactPersonRepository
        .createQueryBuilder('entity')
        .where('entity.id= :id', { id: +id })
        .getCount()) > 0
    );
  }
}
