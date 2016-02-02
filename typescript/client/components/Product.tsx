import * as React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import IProduct from '../interfaces/product';
import getClass from '../../helpers/classesHelper';

interface IProductProps {
  key?: any;
  id: number;
  price: number;
  quantity?: number;
  title: string;
  push?: (String) => any;
}

class Product extends React.Component<IProductProps, {}> {

  render() : React.ReactElement<IProductProps> {
    const styles = require('../../../sass/common.scss');
    
    return (
      <div>
        <a onClick={() => this.props.push(`/product/${this.props.id}`)}>
          <strong>{this.props.title}</strong>
        </a>
        <span> - </span>
        <span>£{this.props.price} </span>
        <span>{this.props.quantity ? `x ${this.props.quantity}` : null}</span>
      </div>
    )
  }
}

export default connect(
  null,
  routeActions as any
)(Product)
