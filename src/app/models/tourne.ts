export class Tourne {
    id!: number;
    status!: 'actif' | 'inactif';
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Tourne>) {
      Object.assign(this, data);
    }
  }
  