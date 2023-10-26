import { useSelector } from 'react-redux';
import { Center, Heading, Spinner } from 'native-base';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShopParamsList } from './shop-screen';
import { FC, useState } from 'react';
import { ModalBuy } from './components/modal-buy';
import {
  apiSlice,
  initialProductsState,
  productsEntityAdapter,
  useGetProductsByCategoryIdQuery,
} from '../../../../slices/api/api.slice';
import { ProductEntityT } from '../../../../slices/api/types/product-entity.type';
import { ShopProductsList } from './components/shop-products-list';
import { AppState } from '../../../packages/store/store';
import { EntitySelectors } from '@reduxjs/toolkit';

export type ShopProductsScreenParams = CompositeScreenProps<
  NativeStackScreenProps<ShopParamsList, 'ShopProducts'>,
  BottomTabScreenProps<MainTabParamList>
>;

export const ShopProductsScreen: FC<ShopProductsScreenParams> = ({ route }) => {
  const { categoryId } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isFetching, error, data } =
    useGetProductsByCategoryIdQuery(categoryId);
  const [chosenProduct, setChosenProduct] = useState<ProductEntityT | null>(
    null,
  );
  if (isFetching) {
    return <Spinner flex={1} />;
  }
  if (error || !data) {
    return <Heading>{showErrorMessage(error)}</Heading>;
  }
  const products = Object.values(data.entities).filter(
    (product) => !!product,
  ) as ProductEntityT[];
  console.log("rendering products")
  console.log(products)
  return (
    <Center mt={50} flex={1}>
      <ShopProductsList
        products={products}
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
