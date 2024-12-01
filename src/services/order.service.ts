import { Order, OrderItem } from '../types/apparel';
import * as apparelModel from '../models/apparel.model';

export const canFulfillOrder = async (order: Order): Promise<boolean> => {
  const results = await Promise.all(order.items.map(async item => {
    const apparel = await apparelModel.getApparel(item.code);
    if (!apparel) return false;

    const size = apparel.sizes.find(s => s.size === item.size);
    return size ? size.quantity >= item.quantity : false;
  }));

  return results.every(result => result);
};

export const calculateLowestCost = async (order: Order): Promise<number | null> => {
  if (!await canFulfillOrder(order)) {
    return null;
  }

  const costs = await Promise.all(order.items.map(async item => {
    const apparel = await apparelModel.getApparel(item.code);
    const size = apparel!.sizes.find(s => s.size === item.size)!;
    return size.price * item.quantity;
  }));

  return costs.reduce((total, cost) => total + cost, 0);
};