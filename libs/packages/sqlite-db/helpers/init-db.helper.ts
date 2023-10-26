import { SqliteDb } from '../sqlite-db';
import { CategoryEntityT } from '../../../../slices/api/types/category-entity.type';
import { ProductEntityT } from '../../../../slices/api/types/product-entity.type';
export async function initDb() {
  if (!process.env.EXPO_PUBLIC_SQLITE_DB_LOCAL_NAME) {
    throw new Error('DB NAME NOT SPECIFIED');
  }

  await SqliteDb.driver().transactionAsync(async (transaction) => {
    console.log('IN TRANSACTION');
    const res = await transaction.executeSqlAsync(`DROP TABLE IF EXISTS products`,[]);
    await transaction.executeSqlAsync(`DROP TABLE IF EXISTS categories`);
    await transaction.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`,
      [],
    );
    console.log('ADDED TABLE CATEGORIES');
    await transaction.executeSqlAsync(
      `CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity REAL NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`,
      [],
    );
    console.log('ADDED TABLE PRODUCTS');

    const categoriesMock: Array<CategoryEntityT> = [
      { name: 'Motherboards',id:1 },
      { name: 'Processors',id:2 },
      { name: 'RAM',id:3 },
      { name: 'Video cards',id:4 },
      { name: 'Sound cards',id:5 },
      { name: 'Hard disks',id:6 },
      { name: 'Optical drives' ,id:7},
      { name: 'Power supplies' ,id:8},
      { name: 'Housings',id:9 },
      { name: 'Cooling systems' ,id:10},
      { name: 'UPS',id:11 },
      { name: 'SSD',id:12 },
      { name: 'Video capture cards' ,id:13},
      { name: 'UPS batteries and accessories',id:14 },
      { name: 'Keyboards and mice',id:15 },
      { name: 'RAID controllers',id:16 },
      { name: 'Mini computers',id:17 },
      { name: 'Mining equipment' ,id:18},
    ];

    await Promise.all(
      categoriesMock.map(async (category) => {
        console.log(`insert into,`, category.name);
        await transaction.executeSqlAsync(
          `INSERT INTO categories (name) VALUES (?)`,
          [category.name],
        );
      }),
    );
    console.log('ADDED CATEGORIES');
    // console.log(await transaction.executeSqlAsync('SELECT * FROM categories'))

    const productsMock: Array<Omit<ProductEntityT, 'id'>> = Object.values(
      categoriesMock,
    )
      .map(({ name: categoryName, id: categoryId }) => {
        return Object.keys(Array.from({ length: 1 })).map((index) => ({
          name: `${index}-${categoryName}`,
          price: Number.parseFloat((Math.random() * 1000).toFixed(1)),
          quantity: 1000,
          categoryId,
          categoryName,
        }));
      })
      .flat();

    await Promise.all(
      productsMock.map(async (product) => {
        await transaction.executeSqlAsync(
          `INSERT INTO products (name,price,quantity,category_id) VALUES (?,?,?,?)`,
          [product.name, product.price, product.quantity, product.categoryId],
        );
      }),
    );
    console.log('ADDED PRODUCTS');

    console.log(await transaction.executeSqlAsync('SELECT * FROM products LIMIT 1'))
    console.log(await transaction.executeSqlAsync('SELECT * FROM categories LIMIT 1'))
  });
}
