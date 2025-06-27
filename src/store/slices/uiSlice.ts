import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }[];
  loading: {
    [key: string]: boolean;
  };
  search: string;
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  loading: {},
  search: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  addNotification,
  removeNotification,
  setLoading,
  setSearch,
} = uiSlice.actions;

export default uiSlice.reducer; 