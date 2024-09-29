export class Product {
    id?: number;
    code!: string;
    name!: string;
    description!: string;
    created_by_id?: number;
    modified_by_id?: number;
    product_subcategory_id?: number;
    unit_id?: number;
    weight!: number;
    measure!: number;
    price_ht!: number;
    tax_id?: number;
    price_ttc!: number;
    status!: 'actif' | 'inactif';
    product_stock_status_id?: number;
    batch_product_id?: number;
    image!: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Product>) {
      Object.assign(this, data);
    }
  }
