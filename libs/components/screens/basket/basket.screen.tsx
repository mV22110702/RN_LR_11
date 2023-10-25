import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC, Fragment, useCallback, useMemo } from 'react';
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

export type BasketScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Basket'
>;
export const BasketScreen: FC<BasketScreenProps> = () => {
  const basketEntries = useSelector(selectAllEntries);
  const totalSum = useMemo(
    () =>
      basketEntries.reduce(
        (prev, entry) =>
          entry.amount * entry.chosenListing.quote.USD.price + prev,
        0,
      ),
    [basketEntries],
  );
  const dispatch = useAppDispatch();
  const handlePressCheckout = useCallback(() => {
    dispatch(clearBasket());
    Toast.show({
      render: ({ id }) => {
        return (
          <Notification
            marginTop={10}
            id={id}
            title={'Currency bought'}
            variant={'solid'}
            status={'success'}
          />
        );
      },
      placement: 'top',
    });
  }, []);
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
