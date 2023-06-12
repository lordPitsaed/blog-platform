import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import articlePageSlice from '../pages/article-page/article-pageSlice';
import editProfileSlice from '../pages/editProfile-page/editProfileSlice';
import listPageSlice from '../pages/list-page/list-pageSlice';
import loginSlice from '../pages/loginPage/loginSlice';
import signUpSlice from '../pages/signUp-page/signUpSlice';

export const store = configureStore({
  reducer: {
    listPageSlice,
    articlePageSlice,
    signUpSlice,
    loginSlice,
    editProfileSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
