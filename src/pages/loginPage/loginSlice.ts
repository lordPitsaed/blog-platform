import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';
import { getCookie } from '../../helperFunctions';

interface LoginSliceState {
  user: UserInfo;
  status: string;
  error: SerializedError;
  userLogged: boolean;
}
const initialState: LoginSliceState = {
  user: {} as UserInfo,
  status: 'idle',
  error: {} as SerializedError,
  userLogged: getCookie('user') !== 'no cookie' ? true : false,
};

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userLogged = false;
      state.user = {} as UserInfo;
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLogged = true;
        state.status = 'success';
        state.user.user = action.payload.user;
        const { token, username } = action.payload.user;
        document.cookie = 'user=' + encodeURIComponent(username) + '!' + encodeURIComponent(token) + '; path=/';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = action.error;
        }
      })
      .addCase(restoreUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user.user = action.payload.user;
        state.userLogged = true;
        state.error = {};
      })
      .addCase(restoreUser.rejected, (state, action) => {
        console.log(action.meta);
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = action.error;
        }
      });
  },
});

export const loginUser = createAsyncThunk('authSlice/loginUser', async (user: LoginData) => {
  return blogPlatformService.postLogin(user);
});

export const restoreUser = createAsyncThunk('authSlice/restoreUser', async (token: string) =>
  blogPlatformService.getLoggedUser(token),
);

export default loginSlice.reducer;

export const { logOut } = loginSlice.actions;
