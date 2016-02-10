import * as React from 'react';
import classnames = require('classnames');
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { checkout, getProducts, getTotal } from '../redux/modules/cart';
import { endLoading } from '../redux/modules/global';
import { ILocation } from 'history';

import IProduct from '../interfaces/Product';

import Product from '../components/Product/Product';
import CheckoutPageComponent from '../components/CheckoutPage';

interface ICheckoutPageContainerProps {
  push?: (String) => any;
  endLoading?: Function;
  checkout?: (products: IProduct[]) => any;
  products: IProduct[];
  total: number;
  location?: ILocation; // React router gives this to us
}
interface ICheckoutPageContainerState {}

class ProductContainer extends React.Component<ICheckoutPageContainerProps, ICheckoutPageContainerState> {

  componentDidMount(): void {
    this.props.endLoading(this.props.location.pathname);
  }

  render() : React.ReactElement<ICheckoutPageContainerProps> {
    return (
      <CheckoutPageComponent
        products={this.props.products}
        total={this.props.total}
        onCheckoutClicked={() => this.checkout()}
      />
    );
  }

  private checkout() {
    this.props.checkout(this.props.products);
    this.props.push('/');
  }
}

function mapStateToProps(state) {
  return {
    products: getProducts(state.products, state.cart),
    total: getTotal(state.products, state.cart)
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { checkout, endLoading }
  ) as any
)(ProductContainer)
