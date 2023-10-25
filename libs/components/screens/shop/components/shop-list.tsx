import { ShopListItem } from './shop-list-item';
import { Divider, FlatList } from 'native-base';
import { Listing } from '../../../../../slices/api/types/types';
import {FC, memo} from 'react';

type Properties = {
  listings: Listing[];
  setChosenListing: (listing: Listing) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
};
export const ShopList: FC<Properties> = memo(
  ({ listings, setChosenListing, setIsModalVisible }) => {
      console.log("LIST RENDER")
    return (
      <FlatList
        width={'100%'}
        px={5}
        data={listings}
        renderItem={({ item }) => (
          <ShopListItem
            listing={item}
            setChosenListing={setChosenListing}
            setIsModalVisible={setIsModalVisible}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  },
  (prevProps, nextProps) => prevProps.listings === nextProps.listings,
);
