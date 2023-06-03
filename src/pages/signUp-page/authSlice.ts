import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface authSliceState {
  user: UserInfo;
  status: string;
  error: SerializedError[];
  userLogged: boolean;
}

const initialState: authSliceState = {
  user: {} as UserInfo,
  status: 'idle',
  error: [],
  userLogged: false,
};

const authSlice = createSlice({
  name: 'authSlice',
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
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.user = action.payload.user;
        state.userLogged = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
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

export const loginUser = createAsyncThunk(
  'authSlice/loginUser',
  async (user: LoginData) => {
    return blogPlatformService.postLogin(user);
  },
);

export default authSlice.reducer;
