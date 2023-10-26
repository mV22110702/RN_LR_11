import { useSelector } from 'react-redux';
import { Center, Divider, FlatList, Heading, Spinner } from 'native-base';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';
import { ShopListCategoryItem } from './components/shop-list-category-item';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShopParamsList } from './shop-screen';
import { FC, useMemo, useState } from 'react';
import { ModalBuy } from './components/modal-buy';
import { ShopCategoriesList } from './components/shop-categories-list';
import {
  selectAllCategories,
  useGetCategoriesQuery,
  useGetProductsByCategoryIdQuery,
} from '../../../../slices/api/api.slice';
import { ProductEntityT } from '../../../../slices/api/types/product-entity.type';

export type ShopProductsScreenParams = CompositeScreenProps<
  NativeStackScreenProps<ShopParamsList, 'ShopProducts'>,
  BottomTabScreenProps<MainTabParamList>
>;

export const ShopHomeScreen: FC<ShopProductsScreenParams> = ({
  navigation,
  route,
}) => {
  const { categoryId } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isFetching, error } = useGetProductsByCategoryIdQuery(categoryId);
  const [chosenProduct, setChosenProduct] = useState<ProductEntityT | null>(
    null,
  );
  const categories = useSelector(selectAllCategories);
  if (isFetching) {
    return <Spinner flex={1} />;
  }
  if (error) {
    return <Heading>{showErrorMessage(error)}</Heading>;
  }
  return (
    <Center mt={50} flex={1}>
      <ShopProductsList
        categories={categories}
        setChosenProduct={setChosenProduct}
        setIsModalVisible={setIsModalVisible}
      />
      <ModalBuy
        product={chosenProduct}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Center>
  );
};
