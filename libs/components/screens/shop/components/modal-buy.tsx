import { Button, Center, FormControl, Modal, Spinner, Text } from 'native-base';
import { FC, useCallback, useMemo, useState } from 'react';
import { addEntry } from '../../../../../slices/basket/basket.slice';
import { useAppDispatch } from '../../../../hooks/use-app-dispatch.hook';
import { Listing } from '../../../../../slices/api/types/types';
import NumericInput from 'react-native-numeric-input';

type Properties = {
  listing: Listing | null;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
};
export const ModalBuy: FC<Properties> = ({
  listing,
  isModalVisible,
  setIsModalVisible,
}) => {
  const INITIAL_AMOUNT = useMemo(() => 1, []);

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const handlePressBuy = useCallback(() => {
    if (!listing) {
      return;
    }
    dispatch(addEntry({ chosenListing: { ...listing }, amount }));
  }, [listing]);

  const handleClose = () => {
    setAmount(INITIAL_AMOUNT);
    setIsModalVisible(false);
  };

  return (
    <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {listing ? `Buy ${listing.name}` : 'Loading...'}
        </Modal.Header>
        <Modal.Body>
          {listing ? (
            <FormControl alignItems={'center'}>
              <FormControl.Label>
                {' '}
                <Text fontSize={'xl'}>How much You want to buy?</Text>
              </FormControl.Label>
              <NumericInput value={amount} iconSize={1} onChange={setAmount} />
            </FormControl>
          ) : (
            <Center>
              <Spinner />
              <Text>Loading...</Text>
            </Center>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleClose}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                handlePressBuy();
                handleClose();
              }}
            >
              Buy
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
