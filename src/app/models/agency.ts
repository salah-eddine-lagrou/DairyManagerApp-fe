export class Agency {
    id!: number;
    code!: string;
    name!: string;
    location!: string;
    created_by_id?: number;
    modified_by_id?: number;
    status!: 'actif' | 'inactif';
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Agency>) {
      Object.assign(this, data);
    }
  }
  