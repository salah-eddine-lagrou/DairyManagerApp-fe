export class ClientSale {
    id!: number;
    total!: number;
    measure_items!: number;
    total_measures!: number;
    sale_date!: Date;
    product_id?: number;
    order_id?: number;
    discount_sale_id?: number;
    price_list_product_details_id?: number;
    batch_product_client_sale_id?: number;
    created_at?: Date;
    updated_at?: Date;
  
    constructor(data?: Partial<ClientSale>) {
      Object.assign(this, data);
    }
  }
  