export class AuthUser {
  email?: string;
  password?: string;
  device_uuid?: string;

  constructor(data?: Partial<AuthUser>) {
    Object.assign(this, data);
  }
}
