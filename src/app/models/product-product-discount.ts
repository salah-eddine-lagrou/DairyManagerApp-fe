export class ProductProductDiscount {
    id!: number;
    product_discount_id?: number;
    product_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ProductProductDiscount>) {
      Object.assign(this, data);
    }
  }
  