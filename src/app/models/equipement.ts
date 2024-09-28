export class Equipement {
    id!: number;
    name!: string;
    code!: string;
    quantity!: number;
    equipement_category_id?: number;
    equipement_state!: 'confort' | 'bon-etat-mais-vide' | 'mal-presente' | 'autres-produits';
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Equipement>) {
      Object.assign(this, data);
    }
  }

  