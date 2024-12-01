import { promises as fs } from 'fs';
import { Apparel, StockUpdate, ApparelStore } from '../types/apparel';

const DATA_FILE = './data/apparel.json';

export const loadData = async (): Promise<ApparelStore> => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    const initialData: ApparelStore = { apparels: [] };
    await saveData(initialData);
    console.log('Data file created.');
    return initialData;
  }
};

export const saveData = async (data: ApparelStore): Promise<void> => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

export const updateStock = async (update: StockUpdate): Promise<void> => {
  const store = await loadData();
  const apparel = store.apparels.find(a => a.code === update.code);
  
  if (!apparel) {
    store.apparels.push({
      code: update.code,
      sizes: [{
        size: update.size,
        quantity: update.quantity,
        price: update.price
      }]
    });
  } else {
    const sizeIndex = apparel.sizes.findIndex(s => s.size === update.size);
    if (sizeIndex === -1) {
      apparel.sizes.push({
        size: update.size,
        quantity: update.quantity,
        price: update.price
      });
    } else {
      apparel.sizes[sizeIndex].quantity = update.quantity;
      apparel.sizes[sizeIndex].price = update.price;
    }
  }
  
  await saveData(store);
};

export const bulkUpdateStock = async (updates: StockUpdate[]): Promise<void> => {
  for (const update of updates) {
    await updateStock(update);
  }
};

export const getApparel = async (code: string): Promise<Apparel | undefined> => {
  const store = await loadData();
  return store.apparels.find(a => a.code === code);
};

export const getAllApparels = async (): Promise<Apparel[]> => {
  const store = await loadData();
  return store.apparels;
};