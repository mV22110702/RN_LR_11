import { useDispatch } from 'react-redux';
import { AppDispatch } from '../packages/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
