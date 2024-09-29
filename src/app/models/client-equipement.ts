export class ClientEquipement {
    id?: number;
    client_id?: number;
    equipement_id?: number;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<ClientEquipement>) {
      Object.assign(this, data);
    }
  }
