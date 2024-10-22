export class PriceList {
  id?: number;
  rank!: number;
  code!: string;
  description!: string;
  price_list_name_id!: number; // Foreign key
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<PriceList>) {
    Object.assign(this, data);
  }
}
