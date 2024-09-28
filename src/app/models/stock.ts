export class Stock {
    id!: number;
    code!: string;
    vendeur_id?: number;
    movement_type!: 'chargement' | 'dechargement' | 'transfert' | 'reception' | 'offert' | 'retour';
    vendeur_transfert_id?: number;
    warehouse_id?: number;
    stock_status!: 'valide' | 'en-attente' | 'refus';
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Stock>) {
      Object.assign(this, data);
    }
  }
  