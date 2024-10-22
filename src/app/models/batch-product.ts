export class BatchProduct {
  id?: number;
  measure_batch!: number;
  measure_items!: number;
  weight_batch!: number;
  batch_product_price!: number;
  batch_unit_id?: number;
  product_id?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<BatchProduct>) {
    Object.assign(this, data);
  }
}
