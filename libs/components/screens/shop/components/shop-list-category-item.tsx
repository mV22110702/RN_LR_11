import { FC, useCallback } from 'react';
import {
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { categoryToImg } from '../../../../maps/category-to-img.map';
import { CategoryEntityT } from '../../../../../slices/api/types/category-entity.type';
import { useNavigation } from '@react-navigation/native';
import { ShopHomeScreenParams } from '../shop-home.screen';

type Properties = {
  category: CategoryEntityT;
  // setChosenListing: (listing: Listing) => void;
  // setIsModalVisible: (isModalVisible:boolean) => void;
};
export const ShopListCategoryItem: FC<Properties> = ({
  category,
  // setChosenListing,
  // setIsModalVisible
}) => {
  const { navigation, route } = useNavigation<ShopHomeScreenParams>();
  const handleChooseListing = useCallback(() => {
    navigation.navigate('ShopProducts', { categoryId: category.id });
    // setChosenListing(listing);
    // setIsModalVisible(true);
  }, []);
  return (
    <Pressable onPress={handleChooseListing}>
      <HStack
        my={30}
        flexDirection={'row'}
        justifyContent={'space-between'}
        flex={1}
      >
        <HStack space={2} flex={3}>
          <Center>
            <Image
              alt={category.name}
              source={{
                uri: categoryToImg[category.name] ?? undefined,
              }}
              size={10}
            />
          </Center>
          <VStack space={1} alignContent={'start'}>
            <Text>{category.name}</Text>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  );
};
