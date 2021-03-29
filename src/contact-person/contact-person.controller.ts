import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmpty, map, tap } from 'rxjs/operators';
import { ContactPerson } from 'src/entities/contactperson.entity';
import { ContactPersonService } from './contact-person.service';
import { ExceptionFactory } from './../exception-factory/exception-factory';


@Controller('contact-person')
export class ContactPersonController {
  constructor(private contactPersonService: ContactPersonService) { }

  @Get()
  read(
    @Param('skip') skip = 0,
    @Param('take') take = 20,
    @Optional() @Param('search') search: ContactPerson
  ): Observable<ContactPerson[] | HttpException> {

    return this.contactPersonService.readAll(skip, take)
      //handle no results found
      .pipe(
        map(stream => stream != null ?
          ExceptionFactory(
            {
              status: `Empty Result Set`,
              success: false,
              message: `No contact people found.`,
              code: 200
            }) : stream)

      )
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number): Observable<ContactPerson | HttpException> {
    return this.contactPersonService.readOne(+id)
      //handle no results found
      .pipe(
        map(stream => stream != null ?
          stream :
          ExceptionFactory(
            {
              status: `Empty Result Set`,
              success: false,
              message: `No contact person with id ${id}.`,
              code: 200
            }
          ))
      )
  }

  @Post('create')
  create(@Body() contactPerson: ContactPerson): Observable<any> {
    return this.contactPersonService.create(contactPerson)
  }

  @Put(':id/update')
  update(@Param('id') id, @Body() contact: ContactPerson): Observable<any> {
    contact.id = Number(id);
    return this.contactPersonService.update(contact)
  }

  @Delete(':id/delete')
  delete(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.contactPersonService.delete(+id)
  }
}