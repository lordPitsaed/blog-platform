import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface SignUpSliceState {
  user: UserInfo;
  status: string;
  error: SerializedError;
}

const initialState: SignUpSliceState = {
  user: {} as UserInfo,
  status: 'idle',
  error: {} as SerializedError,
};

const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.user = action.payload.user;
        state.error = {};
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = action.error;
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

export const { clearErrors } = signUpSlice.actions;

export default signUpSlice.reducer;
