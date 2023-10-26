import { ShopListCategoryItem } from './shop-list-category-item';
import { Center,Text, Divider, FlatList } from 'native-base';
import {FC, memo} from 'react';
import { CategoryEntityT } from '../../../../../slices/api/types/category-entity.type';
import { ProductEntityT } from '../../../../../slices/api/types/product-entity.type';
import { ShopListProductItem } from './shop-list-product-item';

type Properties = {
  products: ProductEntityT[];
  setChosenProduct: (product: ProductEntityT) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
};
export const ShopProductsList: FC<Properties> = memo(
  ({
     products,
     setChosenProduct,
     setIsModalVisible
  }) => {
    return (
      <FlatList
        width={'100%'}
        px={5}
        data={products}
        renderItem={({ item }) => (
          <ShopListProductItem
            product={item}
            setChosenProduct={setChosenProduct}
            setIsModalVisible={setIsModalVisible}
          />
        )}
        ListEmptyComponent={()=><Center><Text>No products left</Text></Center>}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  },
  (prevProps, nextProps) => prevProps.products === nextProps.products,
);
