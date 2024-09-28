export class Warehouse {
    id!: number;
    code!: string;
    name!: string;
    location!: string;
    created_by_id?: number;
    modified_by_id?: number;
    status!: 'actif' | 'inactif';
    warehouse_type!: 'mobile' | 'livraison';
    agency_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Warehouse>) {
      Object.assign(this, data);
    }
  }
  