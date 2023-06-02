import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import articlePageSlice from "../pages/article-page/article-pageSlice"
import listPageSlice from "../pages/list-page/list-pageSlice"

export const store = configureStore({
  reducer: {
    listPageSlice,
    articlePageSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
