import { ValueOf } from '../../../libs/types/value-of.type';

type CategoryEntityT = {
    name: ValueOf<typeof CategoryName>,
    id:number
};

export { type CategoryEntityT };
