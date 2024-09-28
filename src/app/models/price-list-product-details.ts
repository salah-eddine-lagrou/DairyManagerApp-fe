export class PriceListProductDetails {
    id!: number;
    product_id?: number; // Foreign key
    price_list_id?: number; // Foreign key
    code!: string;
    sale_price!: number;
    return_price!: number;
    valid_from!: Date;
    valid_to!: Date;
    closed!: boolean;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<PriceListProductDetails>) {
      Object.assign(this, data);
    }
  }
  