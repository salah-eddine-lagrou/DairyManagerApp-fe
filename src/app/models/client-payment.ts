export class ClientPayment {
    id?: number;
    amount!: number;
    transaction_date!: Date;
    payment_method!: 'avoir' | 'especes' | 'cheque' | 'virement' | 'versement' | 'effet';
    transaction_type!: 'paiement' | 'acompte';
    order_id?: number; // Foreign key
    client_id?: number; // Foreign key
    code!: string;
    payment_period!: string;
    discount!: number;
    notes!: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<ClientPayment>) {
      Object.assign(this, data);
    }
  }
