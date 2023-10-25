import { ProductEntityT } from '../../api/types/product-entity.type';

export type BasketEntry = { id:string; chosenProduct: ProductEntityT; amount: number };
