export class ReportType {
    id?: number;
    type_name!: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<ReportType>) {
      Object.assign(this, data);
    }
  }
