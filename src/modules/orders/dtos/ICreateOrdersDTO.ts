import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export interface IProducts {
  productId: string;
  quantity: number;
  qtyPrice: number;
  // name: string;
  // category: string;
  // unitPrice: number;
  // qtyDiscount: number;
  // discount: number;
  // notes: string;
}

export default interface ICreateOrdersDTO {
  customer: Customer;
  paymentMethod: string;
  isPaid: boolean;
  isPickup: boolean;
  deliveryFee: number;
  finalPrice?: number;
  status?: string;
  deliveryDate: Date;
  products: IProducts[];
}
