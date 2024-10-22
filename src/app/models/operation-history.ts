export class OperationsHistory {
  id?: number;
  operation_type!: string;
  operation_details!: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(data?: Partial<OperationsHistory>) {
    Object.assign(this, data);
  }
}
