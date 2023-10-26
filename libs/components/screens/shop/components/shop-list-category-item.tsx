import { FC, useCallback, useEffect, useState } from 'react';
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
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../../app';
import { ShopParamsList } from '../shop-screen';

type ShopHomeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ShopParamsList, 'ShopHome'>,
  BottomTabNavigationProp<MainTabParamList>
>;

type Properties = {
  category: CategoryEntityT;
};
export const ShopListCategoryItem: FC<Properties> = ({
  category,
}) => {
  const navigation = useNavigation<ShopHomeNavigationProp>();
  const handleChooseListing = useCallback(() => {
    console.log("NAVIGATION")
    navigation.navigate('ShopProducts', { categoryId: category.id });
  }, [category]);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  useEffect(() => {
    (async () => {
      console.log('loading image uri for')
      console.log(category.name)
      const imageUri =
        (await categoryToImg(category.name)) ??
        undefined;
      setImageUri(imageUri);
    })();
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
                uri: imageUri,
              }}
              size={100}
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
