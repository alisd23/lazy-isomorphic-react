import * as React from 'react';
import IProduct from '../interfaces/product';

interface IProductProps {
  key?: any;
  price: number;
  quantity?: number;
  title: string;
}

export default class Product extends React.Component<IProductProps, {}> {

  render() : React.ReactElement<IProductProps> {
    return (
      <div>
        <span>{this.props.title} - </span>
        <span>£{this.props.price} </span>
        <span>{this.props.quantity ? `x ${this.props.quantity}` : null}</span>
      </div>
    )
  }

}
