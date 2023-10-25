import { FC, useEffect, useState } from 'react';
import { User } from '../../../types/user.type';
import { Heading, Spinner, VStack,Image } from 'native-base';
import { MainTabParamList } from '../../app';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type ProfileScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Profile'
>;

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)!;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    setIsLoading(true);
    try {
      const [fetchedCurrentUser]: User[] = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      ).then((response) => response.json());

      const randomId = Math.floor(Math.random() * 54);
      setAvatarUrl(
        `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`,
      );
      setCurrentUser(fetchedCurrentUser);
    } catch (e) {
      alert('Cannot fetch current user');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    void fetchCurrentUser();
  }, []);

  if (isError && !currentUser) {
    return <Heading>Cannot load current user</Heading>;
  }
  return isLoading ? (
    <Spinner flex={1} />
  ) : (
    <VStack space={10} flex={1} justifyContent={'center'} alignItems={'center'}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} size={300} alt={'avatar'} />
      ) : (
        <Heading>No avatar available</Heading>
      )}
      <Heading>Name:{currentUser?.name}</Heading>
      <Heading>Email:{currentUser?.email}</Heading>
    </VStack>
  );
};
