import { createStore } from 'vuex';
import { HttpClient } from '@/utils/api';

const api = new HttpClient('/');

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
    },
  },
  actions: {
    async fetchCsrfCookie() {
      try {
        await api.get('sanctum/csrf-cookie');
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async fetchUser(ctx) {
      try {
        const response = await api.get('api/user', {
          headers: {
            withCredentials: true,
          },
        });

        ctx.commit({
          type: 'setUser',
          user: response.data,
        });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async login(ctx, { credentials }) {
      try {
        await api.post('login', credentials);

        await ctx.dispatch({
          type: 'fetchUser',
        });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async passwordResetLink(ctx, { formData }) {
      try {
        const response = await api.post('forgot-password', formData);

        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async passwordReset(ctx, { formData }) {
      try {
        const response = await api.post('reset-password', formData);

        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async register(ctx, { formData }) {
      try {
        await ctx.dispatch({
          type: 'fetchCsrfCookie',
        });

        await api.post('register', formData);

        await ctx.dispatch({
          type: 'fetchUser',
        });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async sendEmailVerificationNotice() {
      try {
        await api.post('email/verification-notification');
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async verifyEmail(ctx, {
      id, hash, expires, signature,
    }) {
      try {
        await api.post(`email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`);

        await ctx.dispatch({
          type: 'fetchUser',
        });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  modules: {
  },
});

export default store;

export {
  store,
};
