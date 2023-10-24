import { SQLiteDatabase } from 'expo-sqlite';

export interface IDatabase<T> {
  openDatabase(): Promise<void>;
  driver(): T;
}
