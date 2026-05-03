import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthFlowStep = 'login' | 'register' | 'forgot-password' | 'verify-otp';

interface AuthFlowState {
  currentStep: AuthFlowStep;
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthFlowState = {
  currentStep: 'login',
  email: '',
  loading: false,
  error: null,
};

const authFlowSlice = createSlice({
  name: 'authFlow',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<AuthFlowStep>) {
      state.currentStep = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetFlow(state) {
      state.currentStep = 'login';
      state.email = '';
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setStep, setEmail, setLoading, setError, resetFlow } = authFlowSlice.actions;
export default authFlowSlice.reducer;