export class BatchProductStock {
    id!: number;
    product_stock_id?: number;
    responsable_measure_batches?: number;
    magasinier_measure_batches?: number;
    measure_batches?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<BatchProductStock>) {
      Object.assign(this, data);
    }
  }
  