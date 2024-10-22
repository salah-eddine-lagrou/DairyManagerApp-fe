export class SalesAnalysis {
  id?: number;
  vendeur_id?: number;
  period!: string;
  total_sales?: number;
  total_returns?: number;
  total_discounts?: number;
  net_sales?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<SalesAnalysis>) {
    Object.assign(this, data);
  }
}
