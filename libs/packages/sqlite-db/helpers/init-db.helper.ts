import { SqliteDb } from '../sqlite-db';
import { ValueOf } from '../../../types/value-of.type';
import { CategoryEntityT } from '../../../../slices/api/types/category-entity.type';
import { ProductEntityT } from '../../../../slices/api/types/product-entity.type';

const CategoryName = {
  MOTHERBOARDS: 'Motherboards',
  PROCESSORS: 'Processors',
  RAM: 'RAM',
  VIDEO_CARDS: 'Video cards',
  SOUND_CARDS: 'Sound cards',
  HARD_DISKS: 'Hard disks',
  OPTICAL_DRIVES: 'Optical drives',
  POWER_SUPPLIES: 'Power supplies',
  HOUSINGS: 'Housings',
  COOLING_SYSTEMS: 'Cooling systems',
  UPS: 'UPS',
  SSD: 'SSD',
  VIDEO_CAPTURE_CARDS: 'Video capture cards',
  UPS_BATTERIES_AND_ACCESSORIES: 'UPS batteries and accessories',
  KEYBOARDS_AND_MICE: 'Keyboards and mice',
  RAID_CONTROLLERS: 'RAID controllers',
  MINI_COMPUTERS: 'Mini computers',
  MINING_EQUIPMENT: 'Mining equipment',
} as const;

export async function initDb() {
  await SqliteDb.driver().transaction(async (transaction) => {
    transaction.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`,
    );
    transaction.executeSql(
      `CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity REAL NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`,
    );

    const categoriesMock: Array<Omit<CategoryEntityT, 'id'>> = [
      { name: 'Motherboards' },
      { name: 'Processors' },
      { name: 'RAM' },
      { name: 'Video cards' },
      { name: 'Sound cards' },
      { name: 'Hard disks' },
      { name: 'Optical drives' },
      { name: 'Power supplies' },
      { name: 'Housings' },
      { name: 'Cooling systems' },
      { name: 'UPS' },
      { name: 'SSD' },
      { name: 'Video capture cards' },
      { name: 'UPS batteries and accessories' },
      { name: 'Keyboards and mice' },
      { name: 'RAID controllers' },
      { name: 'Mini computers' },
      { name: 'Mining equipment' },
    ];

    categoriesMock.forEach((category) => {
      transaction.executeSql(
        `INSERT INTO categories (name) VALUES (?)`,
        [category.name],
      );
    });

    const productsMock: Array<Omit<ProductEntityT, 'id'>> = Object.values(
      categoriesMock,
    )
      .map(({ name: categoryName }, categoryId) => {
        return Object.keys(Array.from({ length: 10 })).map((index) => ({
          name: `${index}-${categoryName}`,
          price: Number.parseFloat((Math.random() * 1000).toFixed(1)),
          quantity: 1000,
          categoryId,
        }));
      })
      .flat();

    productsMock.forEach((product) => {
      transaction.executeSql(
        `INSERT INTO products (name,price,quantity,category_id) VALUES (?,?,?,?)`,
        [product.name, product.price, product.quantity, product.categoryId],
      );
    });
  });
}
