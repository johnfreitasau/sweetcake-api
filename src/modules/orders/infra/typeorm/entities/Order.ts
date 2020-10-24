import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('orders')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    generated: 'increment',
    type: 'int',
    readonly: true,
  })
  number: number;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ name: 'is_paid' })
  isPaid: boolean;

  @Column({ name: 'is_pickup' })
  isPickup: boolean;

  @Column({ name: 'delivery_fee' })
  deliveryFee: number;

  @Column({ name: 'final_price' })
  finalPrice: number;

  @Column()
  status: string;

  @Column({ name: 'delivery_date' })
  deliveryDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
