import { HStack, VStack, Image, Text, Center, Button } from 'native-base';
import { BasketEntry } from '../../../../../slices/basket/types/types';
import { API_IMAGE_BASE_URL } from '@env';
import {FC, useCallback} from 'react';
import {useAppDispatch} from "../../../../hooks/use-app-dispatch.hook";
import {removeEntry} from "../../../../../slices/basket/basket.slice";

type Properties = { basketEntry: BasketEntry };

export const BasketListItem: FC<Properties> = ({ basketEntry }) => {
  const dispatch = useAppDispatch()
  const handlePressDiscard = useCallback(()=>{
    dispatch(removeEntry(basketEntry))
  },[]);
  return (
    <VStack>
      <HStack
        my={30}
        flexDirection={'row'}
        justifyContent={'space-between'}
        flex={1}
      >
        <HStack space={2} flex={3}>
          <Center>
            <Image
              alt={basketEntry.chosenListing.slug}
              source={{
                uri: `${API_IMAGE_BASE_URL}${basketEntry.chosenListing.slug}.png`,
              }}
              size={10}
            />
          </Center>
          <VStack space={1} alignContent={'start'}>
            <Text>{basketEntry.chosenListing.name}</Text>
            <Text>{basketEntry.chosenListing.symbol}</Text>
          </VStack>
        </HStack>
        <VStack flex={1}>
          <Text>
            {basketEntry.chosenListing.quote.USD.price.toLocaleString()} $
          </Text>
          <Text>x{basketEntry.amount}</Text>
        </VStack>
      </HStack>
      <HStack py={3} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'xl'}>
          <Text fontWeight={'semibold'}>Total: </Text>
          <Text>
            {(
              basketEntry.amount * basketEntry.chosenListing.quote.USD.price
            ).toLocaleString()}{' '}
            $
          </Text>
        </Text>
        <Button colorScheme={'danger'} onPress={handlePressDiscard}>Discard</Button>
      </HStack>
    </VStack>
  );
};
