export class Client {
  id?: number;
  code!: string;
  qr_client?: string;
  name!: string;
  email!: string;
  ice?: string;
  city!: string;
  agency_id?: number;
  client_subcategory_id?: number;
  warehouse_id?: number;
  zone_id?: number;
  sector_id?: number;
  contact_name!: string;
  phone!: string;
  address!: string;
  tour_assignment_commercial?: boolean;
  client_assignment_commercial?: boolean;
  price_list_id?: number;
  credit_limit!: number;
  credit_note_balance!: number;
  global_limit!: number;
  location!: string;
  location_gps_coordinates!: string;
  visit!: 'oui' | 'non';
  offert!: 'oui' | 'non';
  notification!: 'oui' | 'non';
  created_by_id?: number;
  modified_by_id?: number;
  status!: 'en-attente' | 'actif' | 'inactif';
  tourne_id?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<Client>) {
    Object.assign(this, data);
  }
}
