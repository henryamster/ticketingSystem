import { HttpException } from '@nestjs/common';

export function ExceptionFactory({ status, success, message, code }) {
  //build in logic for logging here

  return new HttpException(
    {
      status,
      success,
      message,
    },
    code,
  );
}
