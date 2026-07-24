import { configureStore, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import HomePageReducer from './screens/homePage/slice';
import reduxLogger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
function ProductsPageReducer(state: unknown, action: AnyAction): unknown {
  throw new Error('Function not implemented.');
}

