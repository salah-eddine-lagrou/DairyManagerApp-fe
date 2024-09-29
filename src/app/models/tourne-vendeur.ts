export class TourneVendeur {
    id?: number;
    tourne_id?: number;
    vendeur_id?: number;
    owner!: boolean;
    status!: 'actif' | 'inactif';
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<TourneVendeur>) {
      Object.assign(this, data);
    }
  }
