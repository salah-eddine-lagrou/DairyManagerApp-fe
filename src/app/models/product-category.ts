export class ProductCategory {
    id!: number;
    code!: string;
    name!: string;
    description!: string;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ProductCategory>) {
      Object.assign(this, data);
    }
  }
  