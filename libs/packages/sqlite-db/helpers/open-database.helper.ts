import FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import SQLite from 'expo-sqlite';

/**
 * Open SQLite database on a phone,
 * downloading it from Expo server to local app's document folder first
 * @param pathToDatabaseFile
 * @param localDbName
 */
export async function openDatabase(
  localDbName: string,
): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite',
    );
  }
  return SQLite.openDatabase(`${localDbName}.db`);
}
