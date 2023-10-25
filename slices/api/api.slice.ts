import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { AppState } from '../../libs/packages/store/store';
import { CategoryEntityT } from './types/category-entity.type';
import { SqliteDb } from '../../libs/packages/sqlite-db/sqlite-db';
import { SQLError } from 'expo-sqlite';
import { ProductEntityT } from './types/product-entity.type';

const categoriesEntityAdapter = createEntityAdapter<CategoryEntityT>({
  sortComparer: (listingA, listingB) =>
    listingA.name.localeCompare(listingB.name),
});

const initialCategoriesState = categoriesEntityAdapter.getInitialState();

type CategoriesState = ReturnType<
  typeof categoriesEntityAdapter.getInitialState
>;

const productsEntityAdapter = createEntityAdapter<ProductEntityT>({
  sortComparer: (listingA, listingB) =>
    listingA.name.localeCompare(listingB.name),
});

const initialProductsState = productsEntityAdapter.getInitialState();

type ProductsState = ReturnType<typeof productsEntityAdapter.getInitialState>;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['categories', 'products'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesState, undefined>({
      providesTags: ['categories'],
      queryFn: async () => {
        let result: CategoryEntityT[] = [];
        try {
          SqliteDb.driver().transaction((transaction) => {
            transaction.executeSql(
              `SELECT FROM categories`,
              [],
              (transaction, resultSet) =>
                (result = resultSet.rows._array as CategoryEntityT[]),
              (transaction, error) => {
                throw error;
              },
            );
          });
          console.log('result');
          console.log(result);
          const transformedData = categoriesEntityAdapter.addMany(
            categoriesEntityAdapter.getInitialState(),
            result,
          );
          return { data: transformedData };
        } catch (e) {
          const error = e as SQLError;
          return {
            error: {
              status: error.code,
              data: error.message,
            },
          };
        }
      },
    }),
    getProductsByCategoryId: builder.query<
      ProductsState,
      ProductEntityT['categoryId']
    >({
      providesTags: ['products'],
      queryFn: async (categoryId) => {
        let result: ProductEntityT[] = [];
        try {
          SqliteDb.driver().transaction((transaction) => {
            transaction.executeSql(
              `SELECT FROM products WHERE category_id=?`,
              [categoryId],
              (transaction, resultSet) =>
                (result = resultSet.rows._array as ProductEntityT[]),
              (transaction, error) => {
                throw error;
              },
            );
          });
          console.log('result');
          console.log(result);
          const transformedData = productsEntityAdapter.addMany(
            productsEntityAdapter.getInitialState(),
            result,
          );
          return { data: transformedData };
        } catch (e) {
          const error = e as SQLError;
          return {
            error: {
              status: error.code,
              data: error.message,
            },
          };
        }
      },
    }),
    updateProductById: builder.mutation<
      ProductEntityT,
      {
        id: ProductEntityT['id'];
        payload: Omit<ProductEntityT, 'id' | 'categoryId'>;
      }
    >({
      invalidatesTags: ['products'],
      queryFn: async (payload) => {
        let result: ProductEntityT | null = null;
        let updateSetString = '';
        Object.keys(payload.payload).forEach((key) =>
          updateSetString.concat(`${key}=`),
        );
        try {
          SqliteDb.driver().transaction((transaction) => {
            transaction.executeSql(
              `UPDATE products WHERE id=? ${updateSetString}`,
              [payload.id, ...Object.values(payload.payload)],
              undefined,
              (transaction, error) => {
                throw error;
              },
            );
          });

          SqliteDb.driver().transaction((transaction) => {
            transaction.executeSql(
              `UPDATE products WHERE id=? ${updateSetString}`,
              [payload.id, ...Object.values(payload.payload)],
              (transaction, resultSet) =>
                (result = resultSet.rows.item(0) as ProductEntityT),
              (transaction, error) => {
                throw error;
              },
            );
          });

          if (!result) {
            const sqlError = new SQLError();
            sqlError.message = 'Result is null';
            sqlError.code = 500;
            throw sqlError;
          }

          console.log('result');
          console.log(result);

          return { data: result };
        } catch (e) {
          const error = e as SQLError;
          return {
            error: {
              status: error.code,
              data: error.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
  useUpdateProductByIdMutation,
} = apiSlice;
export const {
  selectIds: selectCategoriesIds,
  selectById: selectCategoriesById,
  selectAll: selectAllCategories,
} = categoriesEntityAdapter.getSelectors<AppState>(
  (state) =>
    apiSlice.endpoints.getCategories.select(undefined)(state).data ??
    initialCategoriesState,
);

export const getProductsSelectors = createSelector(
  [
    (state, _) => state,
    (_, categoryId: ProductEntityT['categoryId']) => categoryId,
  ],
  (state, categoryId: ProductEntityT['categoryId']) =>
    productsEntityAdapter.getSelectors<AppState>(
      (state) =>
        apiSlice.endpoints.getProductsByCategoryId.select(categoryId)(state)
          .data ?? initialProductsState,
    ),
);
