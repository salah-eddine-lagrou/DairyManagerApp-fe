export class Tva {
    id!: number;
    tva!: number;
    description!: string;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Tva>) {
      Object.assign(this, data);
    }
  }
  