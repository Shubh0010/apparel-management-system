import * as apparelModel from '../src/models/apparel.model';
import * as orderService from '../src/services/order.service';
import { Order, StockUpdate } from '../src/types/apparel';

describe('Apparel Management System', () => {
  beforeEach(async () => {
    // Clear the data file before each test
    await apparelModel.saveData({ apparels: [] });
  });

  test('should update stock successfully', async () => {
    const update: StockUpdate = {
      code: 'TSHIRT001',
      size: 'M',
      quantity: 10,
      price: 29.99
    };

    await apparelModel.updateStock(update);
    const apparel = await apparelModel.getApparel('TSHIRT001');
    
    expect(apparel).toBeDefined();
    expect(apparel?.sizes[0].quantity).toBe(10);
    expect(apparel?.sizes[0].price).toBe(29.99);
  });

  test('should check order fulfillment correctly', async () => {
    const update: StockUpdate = {
      code: 'TSHIRT001',
      size: 'M',
      quantity: 5,
      price: 29.99
    };
    await apparelModel.updateStock(update);

    const order: Order = {
      items: [{
        code: 'TSHIRT001',
        size: 'M',
        quantity: 3
      }]
    };

    const canFulfill = await orderService.canFulfillOrder(order);
    expect(canFulfill).toBe(true);
  });

  test('should return false when order cannot be fulfilled', async () => {
    const update: StockUpdate = {
      code: 'TSHIRT001',
      size: 'M',
      quantity: 2,
      price: 29.99
    };
    await apparelModel.updateStock(update);

    const order: Order = {
      items: [{
        code: 'TSHIRT001',
        size: 'M',
        quantity: 3  // Requesting more than available
      }]
    };

    const canFulfill = await orderService.canFulfillOrder(order);
    expect(canFulfill).toBe(false);
  });

  test('should calculate correct order cost', async () => {
    const update: StockUpdate = {
      code: 'TSHIRT001',
      size: 'M',
      quantity: 5,
      price: 30
    };
    await apparelModel.updateStock(update);

    const order: Order = {
      items: [{
        code: 'TSHIRT001',
        size: 'M',
        quantity: 2
      }]
    };

    const cost = await orderService.calculateLowestCost(order);
    expect(cost).toBe(60);
  });

  test('should return null cost when order cannot be fulfilled', async () => {
    const update: StockUpdate = {
      code: 'TSHIRT001',
      size: 'M',
      quantity: 1,
      price: 30
    };
    await apparelModel.updateStock(update);

    const order: Order = {
      items: [{
        code: 'TSHIRT001',
        size: 'M',
        quantity: 2  // Requesting more than available
      }]
    };

    const cost = await orderService.calculateLowestCost(order);
    expect(cost).toBeNull();
  });

  test('should handle bulk stock updates', async () => {
    const updates: StockUpdate[] = [
      {
        code: 'TSHIRT001',
        size: 'M',
        quantity: 10,
        price: 29.99
      },
      {
        code: 'TSHIRT002',
        size: 'L',
        quantity: 5,
        price: 34.99
      }
    ];

    await apparelModel.bulkUpdateStock(updates);
    
    const apparel1 = await apparelModel.getApparel('TSHIRT001');
    const apparel2 = await apparelModel.getApparel('TSHIRT002');

    expect(apparel1?.sizes[0].quantity).toBe(10);
    expect(apparel1?.sizes[0].price).toBe(29.99);
    expect(apparel2?.sizes[0].quantity).toBe(5);
    expect(apparel2?.sizes[0].price).toBe(34.99);
  });

  test('should handle multiple sizes for same apparel', async () => {
    const updates: StockUpdate[] = [
      {
        code: 'TSHIRT001',
        size: 'M',
        quantity: 10,
        price: 29.99
      },
      {
        code: 'TSHIRT001',
        size: 'L',
        quantity: 5,
        price: 34.99
      }
    ];

    await apparelModel.bulkUpdateStock(updates);
    const apparel = await apparelModel.getApparel('TSHIRT001');

    expect(apparel?.sizes).toHaveLength(2);
    expect(apparel?.sizes[0].size).toBe('M');
    expect(apparel?.sizes[1].size).toBe('L');
  });
});