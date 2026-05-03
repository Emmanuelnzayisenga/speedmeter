import axios from 'axios';

const authApi = {
  async login(credentials: { email: string; otp: string }) {
    const res = await axios.post('/api/auth/login', credentials);
    return res.data;
  },
  async logout() {
    await axios.post('/api/auth/logout');
  },
};

export { authApi };
export default authApi;
