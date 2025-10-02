import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Hook personalizado para dispatch com tipos
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook personalizado para selector com tipos
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;