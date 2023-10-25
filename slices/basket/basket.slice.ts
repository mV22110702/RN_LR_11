import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { BasketEntry } from './types/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AppState } from '../../libs/packages/store/store';

const basketEntityAdapter = createEntityAdapter<BasketEntry>();
const initialState = basketEntityAdapter.getInitialState();
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addEntry: {
      reducer(state, { payload }: PayloadAction<BasketEntry>) {
        basketEntityAdapter.addOne(state, payload);
      },
      prepare(payload: Omit<BasketEntry, 'id'>) {
        return {
          payload: { ...payload, id: uuidv4() },
        };
      },
    },
    removeEntry(state, { payload }: PayloadAction<BasketEntry>) {
      basketEntityAdapter.removeOne(state, payload.id);
    },
    clearBasket(state) {
      basketEntityAdapter.removeAll(state);
    },
  },
});

export const { addEntry, removeEntry, clearBasket } = basketSlice.actions;
export const {
  selectById: selectEntryById,
  selectIds: selectEntryIds,
  selectAll: selectAllEntries,
} = basketEntityAdapter.getSelectors<AppState>((state) => state.basket);
