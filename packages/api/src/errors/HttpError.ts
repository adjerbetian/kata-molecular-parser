import { BaseError } from "./BaseError";

export class HttpError extends BaseError {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
