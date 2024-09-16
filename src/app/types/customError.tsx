export class NotFoundError extends Error {
  readonly statusCode: number = 404;
  constructor(readonly message: string = "not found") {
    super();
    this.message = message;
  }
}
