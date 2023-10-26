import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { SQLError } from 'expo-sqlite';

export const showErrorMessage = (
  error: FetchBaseQueryError | SerializedError | Error | undefined,
) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        'error' in error
          ? error.error
          : typeof error.data === 'object'
          ? (error.data as Error)?.message
          //Some weird non-documented object from Expo SQLite
          : (error as { data: string; status: number | undefined }).data;

      return errMsg;
    } else {
      // you can access all properties of `SerializedError` here
      return error.message ?? '';
    }
  }
};
