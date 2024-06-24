import { Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthGuard {
  canActivate() {
    return true; // Always allow requests to pass through
  }
}