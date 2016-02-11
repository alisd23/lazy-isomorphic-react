import * as React from 'react';
import classnames = require('classnames');
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { checkout, getProducts, getTotal } from '../redux/modules/cart';
import { endLoading } from '../redux/modules/global';
import { ILocation } from 'history';

import IProduct from '../interfaces/Product';
import IAppState from '../interfaces/AppState';

import Product from '../components/Product/Product';
import CheckoutPageComponent from '../components/CheckoutPage';

interface ICheckoutPageContainerProps {
  push?: (String) => any;
  endLoading?: Function;
  loading?: boolean;
  checkout?: (products: IProduct[]) => any;
  products: IProduct[];
  total: number;
  location?: ILocation; // React router gives this to us
}
interface ICheckoutPageContainerState {}

class ProductContainer extends React.Component<ICheckoutPageContainerProps, ICheckoutPageContainerState> {

  componentWillMount(): void {
    this.stopLoading();
  }
  componentWillUpdate(nextProps: ICheckoutPageContainerProps): void {
    this.stopLoading(nextProps);
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
  private stopLoading(props = this.props) : void {
    if (props.loading)
      props.endLoading(props.location.pathname);
  }
}

function mapStateToProps(state: IAppState) {
  return {
    products: getProducts(state.products, state.cart),
    total: getTotal(state.products, state.cart),
    loading: state.global.loading
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { checkout, endLoading }
  ) as any
)(ProductContainer)
