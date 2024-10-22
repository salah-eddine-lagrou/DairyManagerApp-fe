export class Request {
  id?: number;
  code!: string;
  reason!: string;
  location!: string;
  modified_by_id?: number;
  warehouse_id?: number;
  vendeur_id?: number;
  responsable_id?: number;
  magasinier_id?: number;
  status_request: 'valid' | 'en-attente' | 'refus' = 'en-attente';
  client_id?: number;
  stock_id?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<Request>) {
    Object.assign(this, data);
  }
}
