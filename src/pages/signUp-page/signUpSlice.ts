import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface SignUpSliceState {
  user: UserInfo;
  status: string;
  error: SerializedError[];
}

const initialState: SignUpSliceState = {
  user: {} as UserInfo,
  status: 'idle',
  error: [],
};

const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.user = action.payload.user;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = state.error.concat(action.error);
          console.log(state.error);
        }
      });
  },
});

export const signUpUser = createAsyncThunk(
  'authSlice/signUpUser',
  async (user: RegisterData) => {
    return blogPlatformService.postRegisterUser(user);
  },
);

export default signUpSlice.reducer;
