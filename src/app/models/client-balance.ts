export class ClientBalance {
    id!: number;
    balance_amount?: number;
    bl_amount?: number;
    credit_note_amount?: number;
    unpaid_amount?: number;
    description?: string;
    client_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ClientBalance>) {
      Object.assign(this, data);
    }
  }
  