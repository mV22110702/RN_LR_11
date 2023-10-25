import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

export const showErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        'error' in error ? error.error : (error.data as Error)?.message;

      return errMsg;
    } else {
      // you can access all properties of `SerializedError` here
      return error.message ?? '';
    }
  }
};
