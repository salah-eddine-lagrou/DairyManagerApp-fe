export class Permission {
    id?: number;
    permission!: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Permission>) {
      Object.assign(this, data);
    }
  }

