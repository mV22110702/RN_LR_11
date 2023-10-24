import { IRepository } from '../../interfaces/repository.interface';
import { SQLiteDatabase } from 'expo-sqlite';
import { openDatabase } from './helpers/open-database.helper';
import { SQLITE_DB_LOCAL_NAME } from '@env';
import { IDatabase } from '../../interfaces/database.interface';
export class SqliteDb implements IDatabase<SQLiteDatabase>{
  private db: SQLiteDatabase | undefined;

  public async openDatabase(): Promise<void> {
    if (!SQLITE_DB_LOCAL_NAME) {
      throw new Error('DB NAME NOT SPECIFIED');
    }
    this.db = await openDatabase(SQLITE_DB_LOCAL_NAME);
  }

  public driver(): SQLiteDatabase {
    if (!this.db) {
      throw new Error('DB is not opened');
    }
    return this.db;
  }
}
