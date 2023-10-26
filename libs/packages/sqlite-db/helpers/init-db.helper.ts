import { SqliteDb } from '../sqlite-db';
import { CategoryEntityT } from '../../../../slices/api/types/category-entity.type';
import { ProductEntityT } from '../../../../slices/api/types/product-entity.type';

export function initDb() {
  SqliteDb.driver().transaction(async (transaction) => {
    transaction.executeSql(`DROP TABLE products`);
    transaction.executeSql(`DROP TABLE categories`);
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
      transaction.executeSql(`INSERT INTO categories (name) VALUES (?)`, [
        category.name,
      ]);
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
          categoryName,
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
