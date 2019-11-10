export interface IBase {
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILogger {
  error(message?: any, ...optionalParams: any[]): void;
}
