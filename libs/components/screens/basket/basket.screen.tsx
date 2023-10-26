import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC, Fragment, useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  Toast,
  Divider,
  FlatList,
  Text,
  VStack,
  Center,
  Box,
  Heading,
} from 'native-base';
import { useSelector } from 'react-redux';
import {
  clearBasket,
  selectAllEntries,
} from '../../../../slices/basket/basket.slice';
import { BasketListItem } from './components/basket-list-item';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { Notification } from '../../notification';
import { useUpdateProductsByIdsMutation } from '../../../../slices/api/api.slice';
import { showErrorMessage } from '../../../helpers/show-error-message.helper';

export type BasketScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Basket'
>;
export const BasketScreen: FC<BasketScreenProps> = () => {
  const basketEntries = useSelector(selectAllEntries);
  console.log('basket entries')
  console.log(basketEntries);
  const totalSum = useMemo(
    () =>
      basketEntries.reduce(
        (prev, entry) => entry.amount * entry.chosenProduct.price + prev,
        0,
      ),
    [basketEntries],
  );
  const dispatch = useAppDispatch();
  const [updateProductsByIds, { error, isSuccess, isUninitialized,isLoading }] =
    useUpdateProductsByIdsMutation();
  const handlePressCheckout = useCallback(() => {
    updateProductsByIds(
      basketEntries.map((basketEntry) => ({
        id: basketEntry.chosenProduct.id,
        partialProduct: {
          quantity: basketEntry.chosenProduct.quantity - basketEntry.amount,
        },
      })),
    );
  }, [updateProductsByIds,basketEntries]);
  useEffect(() => {
    if(isUninitialized||isLoading){
      return;
    }
    console.log('error')
    console.log(error)
    dispatch(clearBasket());
    Toast.show({
      render: ({ id }) => {
        return (
          <Notification
            marginTop={10}
            id={id}
            title={error ? showErrorMessage(error) : 'Products bought'}
            variant={'solid'}
            status={'success'}
          />
        );
      },
      placement: 'top',
    });
  }, [isSuccess, error,isUninitialized,isLoading]);
  return (
    <VStack flex={1}>
      {basketEntries.length === 0 ? (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={'4xl'}>Basket is empty!</Text>
        </Box>
      ) : (
        <Fragment>
          <Fragment>
            <FlatList
              data={basketEntries}
              px={5}
              renderItem={({ item }) => <BasketListItem basketEntry={item} />}
              ItemSeparatorComponent={() => <Divider />}
            />
            <Heading>Total: {totalSum.toLocaleString()} $</Heading>
          </Fragment>
          <Button onPress={handlePressCheckout}>Checkout</Button>
        </Fragment>
      )}
    </VStack>
  );
};
