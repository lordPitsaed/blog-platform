import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface articlePageState {
  article: Article;
  status: string;
  error: SerializedError;
}

const initialState: articlePageState = {
  article: {} as Article,
  status: 'idle',
  error: {},
};

const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.status = 'success';
        state.article = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = action.error;
        }
      });
  },
});

interface FetchArticleBySlugArgs {
  slug: string;
  token?: string;
}

export const fetchArticleBySlug = createAsyncThunk(
  'articlePage/fetchArticleBySlug',
  async (args: FetchArticleBySlugArgs) => {
    const { slug, token } = args;
    return blogPlatformService.getArticleBySlug(slug, token);
  },
);

export default articlePageSlice.reducer;
