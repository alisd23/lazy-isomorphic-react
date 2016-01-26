import IProduct from '../interfaces/Product';

/**
 * Mocking client-server processing
 */

const TIMEOUT = 100;

export default {

  // Can handle timeouts here (Simulate loading delay for now)
  getProducts(callback: Function, timeout?: number) {
    fetch('/products')
      .then((response) => response.json())
      .then((products) => callback(products))
      .catch((err) => console.debug(err));
  },

  buyProducts(payload: any, callback: Function, timeout?: number) {
    setTimeout(() => callback(), timeout || TIMEOUT)
  }

};
