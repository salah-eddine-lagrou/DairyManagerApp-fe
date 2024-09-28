export class Report {
    id!: number;
    content!: string;
    user_id?: number;
    report_type_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<Report>) {
      Object.assign(this, data);
    }
  }
  