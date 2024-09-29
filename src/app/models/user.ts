export class User {
  id?: number;
  code!: string;
  name!: string;
  phone!: string;
  plafond_vendeur?: number;
  pda_code_access?: string;
  printer_code?: string;
  non_tolerated_sales_block?: boolean;
  credit_limit?: number;
  username!: string;
  created_by_id?: number;
  modified_by_id?: number;
  role_id?: number;
  status!: 'actif' | 'inactif';
  responsable_id?: number;
  magasinier_id?: number;
  agency_id?: number;
  warehouse_id?: number;
  zone_id?: number;
  sector_id?: number;
  email!: string;
  email_verified_at?: Date;
  password!: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
