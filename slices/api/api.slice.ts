import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { AppState } from '../../libs/packages/store/store';
import { CategoryEntityT } from './types/category-entity.type';
import { SqliteDb } from '../../libs/packages/sqlite-db/sqlite-db';
import { ResultSet, SQLError } from 'expo-sqlite';
import { ProductEntityT } from './types/product-entity.type';

const categoriesEntityAdapter = createEntityAdapter<CategoryEntityT>({
  sortComparer: (listingA, listingB) =>
    listingA.name.localeCompare(listingB.name),
});

const initialCategoriesState = categoriesEntityAdapter.getInitialState();

type CategoriesState = ReturnType<
  typeof categoriesEntityAdapter.getInitialState
>;

export const productsEntityAdapter = createEntityAdapter<ProductEntityT>({
  sortComparer: (listingA, listingB) =>
    listingA.name.localeCompare(listingB.name),
});

export const initialProductsState = productsEntityAdapter.getInitialState();

export type ProductsState = ReturnType<
  typeof productsEntityAdapter.getInitialState
>;

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
          await SqliteDb.driver().transactionAsync(async (transaction) => {
            const tempResult = await transaction.executeSqlAsync(
              `SELECT id,name FROM categories`,
              [],
            );
            result = tempResult.rows as CategoryEntityT[];
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
          await SqliteDb.driver().transactionAsync(async (transaction) => {
            console.log('products.cat_id=1');
            console.log(
              await transaction.executeSqlAsync(
                `SELECT * FROM products WHERE products.category_id=1`,
                [],
              ),
            );
            console.log('categories.id=1');
            console.log(
              await transaction.executeSqlAsync(
                `SELECT * FROM categories WHERE categories.id=1`,
                [],
              ),
            );
            const tempResult = await transaction.executeSqlAsync(
              `SELECT 
                products.id,
                products.name,
                products.price,
                products.quantity,
                products.category_id as categoryId,
                categories.name as categoryName
               FROM
                products JOIN categories ON (products.category_id=categories.id)
               WHERE products.category_id=?
                `,
              [categoryId],
            );
            console.log('categoryId');
            console.log(categoryId);
            console.log('after select product');
            console.log(tempResult);
            result = tempResult.rows as ProductEntityT[];
          });
          console.log('result');
          console.log(result);
          const transformedData = productsEntityAdapter.addMany(
            productsEntityAdapter.getInitialState(),
            result,
          );
          return { data: transformedData };
        } catch (e) {
          console.error(e);
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
    updateProductsByIds: builder.mutation<
      number,
      {
        id: ProductEntityT['id'];
        partialProduct: Partial<Omit<ProductEntityT, 'id' | 'categoryId'>>;
      }[]
    >({
      invalidatesTags: ['products'],
      queryFn: async (payloads) => {
        try {
          await Promise.all(
            payloads.map(async (payload) => {
              let updateSetString = '';
              Object.keys(payload.partialProduct).forEach(
                (key, index) =>
                  (updateSetString = updateSetString.concat(
                    `${key}=?${
                      index === Object.keys(payload.partialProduct).length - 1
                        ? ''
                        : ', '
                    }`,
                  )),
              );

              await SqliteDb.driver().transactionAsync(async (transaction) => {
                await transaction.executeSqlAsync(
                  `UPDATE products SET ${updateSetString} WHERE id=?`,
                  [...Object.values(payload.partialProduct), payload.id],
                );
                await transaction.executeSqlAsync(
                  `DELETE FROM products WHERE quantity=0`,
                  [],
                );
              });
            }),
          );

          return { data: payloads.length };
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
  useUpdateProductsByIdsMutation,
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
