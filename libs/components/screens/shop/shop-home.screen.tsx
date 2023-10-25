import { useSelector } from 'react-redux';
import { Center, Divider, FlatList, Heading, Spinner } from 'native-base';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';
import { ShopListItem } from './components/shop-list-item';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShopParamsList } from './shop-screen';
import { FC, useMemo, useState } from 'react';
import { ModalBuy } from './components/modal-buy';
import { ShopList } from './components/shop-list';

type ShopHomeScreenParams = CompositeScreenProps<
  NativeStackScreenProps<ShopParamsList, 'ShopHome'>,
  BottomTabScreenProps<MainTabParamList>
>;

export const ShopHomeScreen: FC<ShopHomeScreenParams> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isFetching, error } = useGetListingsLatestQuery(undefined);
  const [chosenListing, setChosenListing] = useState<Listing | null>(null);
  const listings = useSelector(selectAllListings);
  if (isFetching) {
    return <Spinner flex={1} />;
  }
  if (error) {
    return <Heading>{showErrorMessage(error)}</Heading>;
  }
  return (
    <Center mt={50} flex={1}>
      <ShopList
        listings={listings}
        setChosenListing={setChosenListing}
        setIsModalVisible={setIsModalVisible}
      />
      <ModalBuy
        listing={chosenListing}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Center>
  );
};
