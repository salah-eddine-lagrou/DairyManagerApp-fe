export class ClientSubcategory {
    id?: number;
    name!: string;
    code!: string;
    description!: string;
    client_category_id?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<ClientSubcategory>) {
      Object.assign(this, data);
    }
  }
