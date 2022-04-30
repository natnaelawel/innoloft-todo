import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configurationsReducer from "./features/configurationsSlice";
import productsReducer from "./features/productsSlice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const createStore = () =>
  configureStore({
    reducer: {
      configurations: configurationsReducer,
      products: productsReducer,
    },
  });

export const store = createStore();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
