export class ProductStock {
    id!: number;
    stock_id?: number;
    product_id?: number;
    product_stock_status!: 'vendable' | 'non-vendable' | 'reserve';
    batch_product_stock_id?: number;
    approved_status!: 'en-attente' | 'approuve' | 'non-approve';
    responsable_measure?: number;
    magasinier_measure?: number;
    measure_items!: number;
    total_measures!: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ProductStock>) {
      Object.assign(this, data);
    }
  }
  