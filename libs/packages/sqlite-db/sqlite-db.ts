import { SQLiteDatabase } from 'expo-sqlite';
import { openDatabase } from './helpers/open-database.helper';
import { SQLITE_DB_LOCAL_NAME } from '@env';
export class SqliteDb {
  private static db: SQLiteDatabase | undefined;

  public static async openDatabase(): Promise<void> {
    if (!SQLITE_DB_LOCAL_NAME) {
      throw new Error('DB NAME NOT SPECIFIED');
    }
    this.db = await openDatabase(SQLITE_DB_LOCAL_NAME);
  }

  public static driver(): SQLiteDatabase {
    if (!this.db) {
      throw new Error('DB is not opened');
    }
    return this.db;
  }
}
