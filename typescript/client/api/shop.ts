import IProduct from '../../universal/interfaces/Product';

/**
 * Mocking client-server processing
 */

const TIMEOUT = 100;

interface buyProductsPayload {
  products: number,
  total: number,
  balance: number
}


export default {

  // Can handle timeouts here (Simulate loading delay for now)
  getProducts(callback: Function, timeout?: number) {
    fetch('/products')
      .then((response) => response.json())
      .then((products) => (callback(products), console.log(products)))
      .catch((err) => console.debug(err));
  },

  buyProducts(
    cart: IProduct[],
    total: number,
    balance: number,
    successCB: Function,
    errorCB: Function,
    timeout?: number
  ) {
    // Simulate 40% chance of error
    if (total <= balance) {
      setTimeout(() => Math.random() > 0.4 ? successCB() : errorCB(), timeout = TIMEOUT);
    } else {
      errorCB('Not enough cash money in da bank');
    }
  }

};
