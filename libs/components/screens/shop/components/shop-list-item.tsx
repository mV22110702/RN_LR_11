import { FC, useCallback } from 'react';
import { Listing } from '../../../../../slices/api/types/types';
import { Button, Center, HStack, Image, Text, VStack } from 'native-base';
import { API_IMAGE_BASE_URL } from '@env';

type Properties = {
  listing: Listing;
  setChosenListing: (listing: Listing) => void;
  setIsModalVisible: (isModalVisible:boolean) => void;
};
export const ShopListItem: FC<Properties> = ({ listing, setChosenListing,setIsModalVisible }) => {
  const handleChooseListing = useCallback(() => {
    setChosenListing(listing);
    setIsModalVisible(true);
  }, []);
  return (
    <HStack
      my={30}
      flexDirection={'row'}
      justifyContent={'space-between'}
      flex={1}
    >
      <HStack space={2} flex={3}>
        <Center>
          <Image
            alt={listing.slug}
            source={{
              uri: `${API_IMAGE_BASE_URL}${listing.slug}.png`,
            }}
            size={10}
          />
        </Center>
        <VStack space={1} alignContent={'start'}>
          <Text>{listing.name}</Text>
          <Text>{listing.symbol}</Text>
        </VStack>
      </HStack>
      <VStack space={5} flex={1}>
        <Text color={'warning'}>{listing.quote.USD.price.toLocaleString()} $</Text>
        <Button
          onPress={handleChooseListing}
          size={10}
          colorScheme={'info'}
          width={75}
        >
          Buy
        </Button>
      </VStack>
    </HStack>
  );
};


