export class Order {
  id?: number;
  code!: string;
  total_totals!: number;
  amount_total!: number;
  client_id?: number; // Foreign key
  vendeur_id?: number; // Foreign key
  order_status!: 'vente' | 'commande' | 'offert' | 'retour';
  order_payment_status!: 'payee' | 'non-payee';
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<Order>) {
    Object.assign(this, data);
  }
}
