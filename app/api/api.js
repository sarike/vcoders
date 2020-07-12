import axios from 'axios';
import store from '../redux/store';

export default class Api {
  constructor(config) {
    this.parseCofig(config);
  }

  dispatchAction(actionType, place, payload, error, meta) {
    if (!actionType) return;
    const action = {
      type: `${actionType}-${place}`,
      payload,
      error,
      meta,
    };
    store.dispatch(action);
  }

  parseCofig(config) {
    Object.keys(config).forEach((apiKey) => {
      const { actionType, url, ...axiosOptions } = config[apiKey];
      this[apiKey] = (customOptions = {}, metaData) => {
        const targetUrl = url.replace(/:(\w+)/g, (_, param) => {
          if (customOptions.params && customOptions.params[param]) {
            const value = customOptions.params[param];
            delete customOptions.params[param];
            return value;
          }
        });
        this.dispatchAction(actionType, 'pre', null, false, metaData);
        const reqPromise = axios({
          url: targetUrl,
          ...axiosOptions,
          ...customOptions,
        });
        if (actionType) {
          reqPromise
            .then((res) => {
              this.dispatchAction(actionType, 'success', res.data, false, metaData);
              this.dispatchAction(actionType, 'complete', null, false, metaData);
            })
            .catch((error) => {
              const payload = error.response && error.response.data;
              this.dispatchAction(actionType, 'error', payload, true, metaData);
              this.dispatchAction(actionType, 'complete', null, true, metaData);
              throw error;
            });
        }
        return reqPromise;
      };
    });
  }
}
