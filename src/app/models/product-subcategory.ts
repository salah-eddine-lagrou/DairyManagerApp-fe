export class ProductSubcategory {
    id!: number;
    code!: string;
    name!: string;
    description!: string;
    product_category_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ProductSubcategory>) {
      Object.assign(this, data);
    }
  }
  