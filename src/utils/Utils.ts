import * as crypto from 'crypto';

export class Utils {
  static toHash(theText: string): string {
    return crypto
      .createHash('sha256')
      .update(theText)
      .digest('hex');
  }
}
