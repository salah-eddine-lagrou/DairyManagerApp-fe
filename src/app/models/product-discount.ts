export class ProductDiscount {
    id!: number;
    discount_rate!: number;
    discount_type!: string;
    start_date!: Date;
    end_date!: Date;
    description!: string;
    status!: 'actif' | 'inactif';
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ProductDiscount>) {
      Object.assign(this, data);
    }
  }
  