import { ValueOf } from '../../../libs/types/value-of.type';
import { CategoryName } from '../../../libs/enums/category-name.enum';

type ProductEntityT = {
    id: number
    name: string,
    price: number
    quantity:number;
    categoryId:number;
    categoryName:ValueOf<typeof CategoryName>;
};

export { type ProductEntityT };
