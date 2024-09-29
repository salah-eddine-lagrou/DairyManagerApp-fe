export class EquipementCategory {
    id?: number;
    code!: string;
    name!: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<EquipementCategory>) {
      Object.assign(this, data);
    }
  }
