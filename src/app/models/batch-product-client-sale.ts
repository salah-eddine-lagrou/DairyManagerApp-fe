export class BatchProductClientSale {
  id?: number;
  measure_batches!: number;
  client_sale_id?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<BatchProductClientSale>) {
    Object.assign(this, data);
  }
}
