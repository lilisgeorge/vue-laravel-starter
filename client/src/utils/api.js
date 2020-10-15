import axios from 'axios';
import Qs from 'qs';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    data: {},
    paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  };

  const client = axios.create(options);

  client.interceptors.request.use((config) => {
    const auth = JSON.parse(window.localStorage.getItem('auth'));

    if (auth && auth.accessToken !== null) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
  });

  return client;
};

class HttpClient {
  constructor(baseUrl) {
    this.client = getClient(baseUrl);
  }

  request(conf = {}) {
    return this.client.request(conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  get(url, conf) {
    return this.client.get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client.delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client.head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data, conf = {}) {
    return this.client.post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data, conf = {}) {
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return this.post(url, data, conf)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
    }

    return this.client.put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client.patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export { HttpClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    return getClient().get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient().delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient().head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient().post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient().put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient().patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
