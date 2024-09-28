export class Sector {
    id!: number;
    code!: string;
    name!: string;
    description!: string;
    zone_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Sector>) {
      Object.assign(this, data);
    }
  }
  