import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import blogPlatformService from "../../blog-platform-service"

interface articleListState {
  articles: Article[]
  status: string
  error: SerializedError[]
  totalArticles: number
  offset: number
}

const initialState: articleListState = {
  articles: [],
  status: "idle",
  error: [],
  totalArticles: 0,
  offset: 0,
}

const listPageSlice = createSlice({
  name: "articleList",
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.status = "success"
        state.articles = action.payload.articles
        state.totalArticles = action.payload.totalArticles
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        if (action.error !== undefined) {
          state.error = state.error.concat(action.error)
        }
      })
  },
})

export const fetchArticlesList = createAsyncThunk(
  "articleList/fetchArticlesList",
  async (offset: number) => {
    return blogPlatformService.getArticles(offset)
  },
)
export const { setOffset } = listPageSlice.actions

export default listPageSlice.reducer
