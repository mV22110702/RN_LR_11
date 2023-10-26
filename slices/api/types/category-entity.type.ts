import { ValueOf } from '../../../libs/types/value-of.type';
import { CategoryName } from '../../../libs/enums/category-name.enum';

type CategoryEntityT = {
    name: ValueOf<typeof CategoryName>,
    id:number
};

export { type CategoryEntityT };
