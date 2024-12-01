import { Request, Response } from 'express';
import * as apparelModel from '../models/apparel.model';
import * as orderService from '../services/order.service';
import { StockUpdate, Order } from '../types/apparel';

export const updateStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const update: StockUpdate = req.body;
    await apparelModel.updateStock(update);
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update stock' });
  }
};

export const bulkUpdateStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const updates: StockUpdate[] = req.body;
    await apparelModel.bulkUpdateStock(updates);
    res.status(200).json({ message: 'Bulk stock update successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform bulk update' });
  }
};

export const checkOrderFulfillment = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = req.body;
    const canFulfill = await orderService.canFulfillOrder(order);
    res.status(200).json({ canFulfill });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check order fulfillment' });
  }
};

export const getOrderCost = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = req.body;
    const cost = await orderService.calculateLowestCost(order);
    if (cost === null) {
      res.status(400).json({ error: 'Order cannot be fulfilled' });
    } else {
      res.status(200).json({ cost });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate order cost' });
  }
};