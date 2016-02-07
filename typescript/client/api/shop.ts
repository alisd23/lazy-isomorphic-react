import IProduct from '../../universal/interfaces/Product';

/**
 * Mocking client-server processing
 */

const TIMEOUT = 100;

export default {

  // Can handle timeouts here (Simulate loading delay for now)
  getProducts(callback: Function, timeout?: number) {
    fetch('/products')
      .then((response) => response.json())
      .then((products) => (callback(products), console.log(products)))
      .catch((err) => console.debug(err));
  },

  buyProducts(payload: any, successCB: Function, errorCB, timeout?: number) {
    // Simulate 40% chance of error
    setTimeout(() => Math.random() > 0.4 ? successCB() : errorCB(), timeout = TIMEOUT)
  }

};
