export class DiscountSale {
  id?: number;
  code!: string;
  discount!: number; // Using decimal type for precision
  discount_type!: 'permanent-discounts' | 'periodic-discounts';
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<DiscountSale>) {
    Object.assign(this, data);
  }
}

