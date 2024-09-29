export class Zone {
    id?: number;
    code!: string;
    name!: string;
    description!: string;
    warehouse_id?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Zone>) {
      Object.assign(this, data);
    }
  }
