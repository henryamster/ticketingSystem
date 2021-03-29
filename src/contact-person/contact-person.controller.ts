import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContactPerson } from 'src/entities/contactperson.entity';
import { ContactPersonService } from './contact-person.service';

@Controller('contact-person')
export class ContactPersonController {
  constructor(private contactPersonService: ContactPersonService) {}

  @Get()
  read(
    @Param('skip') skip = 0,
    @Param('take') take = 20,
  ): Observable<ContactPerson[]> {
    return this.contactPersonService.readAll(skip, take)
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id:number): Observable<ContactPerson | Error>  {
    return this.contactPersonService.readOne(+id)
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
  delete(@Param('id', ParseIntPipe) id:number): Observable<any> {
    return this.contactPersonService.delete(+id)
  }
}
