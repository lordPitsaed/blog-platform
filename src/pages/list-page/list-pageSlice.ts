import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface articleListState {
  articles: Article[];
  status: string;
  error: SerializedError;
  totalArticles: number;
}

const initialState: articleListState = {
  articles: [],
  status: 'idle',
  error: {},
  totalArticles: 0,
};

const listPageSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.totalArticles;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        if (action.error !== undefined) {
          console.log(action.error);
          state.error = action.error;
        }
      });
  },
});

interface FetchArticlesArgs {
  offset: number;
  token?: string;
}

export const fetchArticlesList = createAsyncThunk('articleList/fetchArticlesList', async (args: FetchArticlesArgs) => {
  const { offset, token } = args;
  if (token === undefined) {
    return blogPlatformService.getArticles(offset);
  } else {
    return blogPlatformService.getArticles(offset, token);
  }
});

export default listPageSlice.reducer;
