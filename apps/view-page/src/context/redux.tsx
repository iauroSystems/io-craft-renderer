import {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from '../store';
import { Provider } from 'react-redux';
import { MicroFrontendContext } from '.';
import { useDispatch } from 'react-redux';

const _store = configureStore({
  //TODO: Need to remove this comment and add serilize object in redux store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: reducers,
});
export type AppDispatch = typeof _store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const ReduxContext = createContext<any>(null);

export const ReduxProvider: FC<ReactNode> | any = ({ children }: any) => {
  const { microFrontends } = useContext(MicroFrontendContext);
  const [store, setStore] = useState<any>(_store);

  useEffect(() => {
    if (Object.keys(microFrontends.slices).length === 0) return;
    const _reducers = combineReducers({
      ...reducers,
      // ...microFrontends.slices,
    });
    store.replaceReducer(_reducers);
  }, [microFrontends, store]);

  return (
    <ReduxContext.Provider value={{ store, setStore }}>
      <Provider store={store}>{children}</Provider>
    </ReduxContext.Provider>
  );
};

export default ReduxProvider;
