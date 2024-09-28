export class AuthUser {
  email!: string;
  password!: string;

  constructor(data?: Partial<AuthUser>) {
    Object.assign(this, data);
  }
}
