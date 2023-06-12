import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogPlatformService from '../../blog-platform-service';

interface EditProfileState {
  user: UserInfo;
  status: string;
  error: SerializedError;
}

const initialState: EditProfileState = {
  user: {} as UserInfo,
  status: 'idle',
  error: {} as SerializedError,
};

const editProfileSlice = createSlice({
  name: 'editProfileSlice',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload.user;
        state.error = {};
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'error';
        if (action.error !== undefined) {
          state.error = action.error;
        }
      });
  },
});

interface editUserThunkArgs {
  token: string;
  editData: EditData;
}

export const editUser = createAsyncThunk('editProfileSlice/editUser', async (args: editUserThunkArgs) => {
  const { token, editData } = args;
  return blogPlatformService.editUser(token, editData);
});

export const { clearError } = editProfileSlice.actions;

export default editProfileSlice.reducer;
