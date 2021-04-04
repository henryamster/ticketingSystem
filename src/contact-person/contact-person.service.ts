import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  UpdateResult,
  DeleteResult,
  QueryBuilder,
  Like,
} from 'typeorm';
import {
  ContactPerson,
  IContactPersonSearch,
} from './../entities/contactperson.entity';

import { from, noop, Observable, of, pipe, throwError } from 'rxjs';
import { ApplicationWideSettings } from 'src/app.config';
@Injectable()
export class ContactPersonService {
  constructor(
    @InjectRepository(ContactPerson)
    private readonly contactPersonRepository: Repository<ContactPerson>,
  ) { }

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

  search(
    skipNumber: number,
    takeNumber: number,
    contactPerson: IContactPersonSearch,
  ): Observable<ContactPerson[]> {
    const valuesArray = ApplicationWideSettings.generateValuesArray(
      contactPerson,
    );
    return from(
      this.contactPersonRepository.find({
        where: valuesArray,
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
