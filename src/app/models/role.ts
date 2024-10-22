export class Role {
  id?: number;
  prefix?: string;
  role_name!: string;
  description!: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<Role>) {
    Object.assign(this, data);
  }
}
