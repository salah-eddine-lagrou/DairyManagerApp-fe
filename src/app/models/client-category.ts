export class ClientCategory {
  id?: number;
  name!: string;
  code!: string;
  description!: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<ClientCategory>) {
    Object.assign(this, data);
  }
}
