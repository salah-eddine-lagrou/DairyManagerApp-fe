export class PriceListName {
    id!: number;
    name!: string; // Unique name for the price list
    description?: string; // Optional description of the price list
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<PriceListName>) {
      Object.assign(this, data);
    }
  }
  