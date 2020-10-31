import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrderItem from './OrderItem';

@Entity('orders')
class Order {
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

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItem[];

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

export default Order;
