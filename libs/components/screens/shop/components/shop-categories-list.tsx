import { ShopListCategoryItem } from './shop-list-category-item';
import { Divider, FlatList } from 'native-base';
import {FC, memo} from 'react';
import { CategoryEntityT } from '../../../../../slices/api/types/category-entity.type';

type Properties = {
  categories: CategoryEntityT[];
  // setChosenListing: (listing: Listing) => void;
  // setIsModalVisible: (isModalVisible: boolean) => void;
};
export const ShopCategoriesList: FC<Properties> = memo(
  ({
     categories,
     // setChosenListing,
     // setIsModalVisible
  }) => {
    return (
      <FlatList
        width={'100%'}
        px={5}
        data={categories}
        renderItem={({ item }) => (
          <ShopListCategoryItem
            category={item}
            // setChosenListing={setChosenListing}
            // setIsModalVisible={setIsModalVisible}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  },
  (prevProps, nextProps) => prevProps.categories === nextProps.categories,
);
