export class Dashboard {
    id!: number;
    configuration!: string;
    user_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Dashboard>) {
      Object.assign(this, data);
    }
  }
  