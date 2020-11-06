import { injectable, inject } from 'tsyringe';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/infra/errors/AppError';

interface IRequest {
  customerId: string;
  paymentMethod: string;
  isPaid: boolean;
  isPickup: boolean;
  deliveryFee: number;
  // status: string;
  deliveryDate: Date;
  products: IProductsDTO[];
}

interface IProductsDTO {
  id: string;
  quantity: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    customerId,
    paymentMethod,
    isPaid,
    isPickup,
    deliveryFee = 0,
    // status,
    deliveryDate,
    products,
  }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError('Customer does not exist.');
    }

    const checkProducts = await this.productsRepository.findAllById(
      products.map(product => ({ id: product.id })),
    );

    if (products.length !== checkProducts.length) {
      throw new AppError('Products list invalid.');
    }

    const orderItems = products.map(product => {
      const productPrice = checkProducts.find(
        findProduct => findProduct.id === product.id,
      )?.unitPrice;

      if (!productPrice) {
        throw new AppError('Price not found for this product.');
      }

      return {
        productId: product.id,
        quantity: product.quantity,
        qtyPrice: product.quantity * productPrice,
      };
    });

    const finalPrice = orderItems.reduce((increment, orderItem) => {
      return increment + orderItem.qtyPrice;
    }, 0);

    const order = await this.ordersRepository.create({
      customer,
      paymentMethod,
      isPaid,
      isPickup,
      deliveryFee,
      finalPrice,
      status: 'To be started',
      deliveryDate,
      products: orderItems,
    });

    return order;
  }
}

export default CreateOrderService;
