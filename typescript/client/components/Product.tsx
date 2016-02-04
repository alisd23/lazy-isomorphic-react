import * as React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import IProduct from '../interfaces/product';

interface IProductProps {
  key?: any;
  id: number;
  price: number;
  quantity?: number;
  image: string;
  title: string;
  push?: (String) => any;
}

class Product extends React.Component<IProductProps, {}> {

  render() : React.ReactElement<IProductProps> {
    // Import styles
    require('../../../sass/common.scss');

    return (
      <div className="flex">
        <div className="frame flex-static m-r-3">
          <img src={`/assets/images/${this.props.image}`} />
        </div>
        <div className="flex-expand">
          <a onClick={() => this.props.push(`/product/${this.props.id}`)}>
            <strong>{this.props.title}</strong>
          </a>
          <p>£{this.props.price} </p>
          <span>{this.props.quantity ? `x ${this.props.quantity}` : null}</span>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  routeActions as any
)(Product)
