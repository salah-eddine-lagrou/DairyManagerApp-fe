export class Unit {
  id?: number;
  name!: string;
  description!: string;
  unit_category!: 'item' | 'batch';
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<Unit>) {
    Object.assign(this, data);
  }
}
