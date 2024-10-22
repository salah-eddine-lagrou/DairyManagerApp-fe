export class ProductStockStatus {
  id?: number;
  status!: string;
  description!: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<ProductStockStatus>) {
    Object.assign(this, data);
  }
}
