import { SQLiteDatabase } from 'expo-sqlite';
import { openDatabase } from './helpers/open-database.helper';
export class SqliteDb {
  private static db: SQLiteDatabase | undefined;

  public static async openDb(): Promise<void> {
    if (!process.env.EXPO_PUBLIC_SQLITE_DB_LOCAL_NAME) {
      throw new Error('DB NAME NOT SPECIFIED');
    }
    SqliteDb.db = await openDatabase(process.env.EXPO_PUBLIC_SQLITE_DB_LOCAL_NAME);
  }

  public static driver(): SQLiteDatabase {
    if (!SqliteDb.db) {
      throw new Error('DB is not opened');
    }
    return SqliteDb.db;
  }
}
