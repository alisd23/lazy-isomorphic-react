import * as io from 'socket.io-client';
import { Store } from 'redux';
import shop from './shop';

import { newProductReceived } from '../../universal/redux/modules/products';

export default class SocketManager {
  private _socket: SocketIOClient.Socket;
  private _store: Store;

  constructor(store: Store) {
    this._store = store;
  }

  connect() {
    this._socket = io();

    this._socket.on('connect', () => {
      this.setupEventListeners();
    });

    return this._socket;
  }

  get socket() {
    return this._socket;
  }
  get store() {
    return this._store;
  }

  private setupEventListeners() {
    this._socket.on('authenticated', (data) => {
      console.log('Sockets connected', data);
    })
    this._socket.on('new_product', (product) => {
      // this.store.dispatch(newProductReceived(product));
    })
  }
}
