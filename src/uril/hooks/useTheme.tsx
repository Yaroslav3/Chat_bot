import {useSelector} from 'react-redux';
import {RootState} from './../../store/store';
import {StateDevise} from './../../store/state/devise-system.tsx';

export const useTheme = () => {
  const stateSelect: StateDevise = useSelector((state: RootState) => state.devise);
  return stateSelect.dataDevise.theme;
};
