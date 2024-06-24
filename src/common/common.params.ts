import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomHttpStatus } from './httpStatus.enum';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: CustomHttpStatus) {
    // Convert CustomHttpStatus to corresponding HttpStatus
    const httpStatus: HttpStatus = CustomException.getHttpStatus(statusCode);

    // Check if the status code is valid
    if (!httpStatus) {
      throw new Error('Invalid HTTP status code');
    }

    super(message, httpStatus);
  }

  // Helper method to convert CustomHttpStatus to HttpStatus
  private static getHttpStatus(customStatus: CustomHttpStatus): HttpStatus {
    switch (customStatus) {
      case CustomHttpStatus.OK:
        return HttpStatus.OK;
      case CustomHttpStatus.BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;
      case CustomHttpStatus.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case CustomHttpStatus.INTERNAL_SERVER_ERROR:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      // Handle other cases if needed
      default:
        return null; // Or throw an error if necessary
    }
  }
}
