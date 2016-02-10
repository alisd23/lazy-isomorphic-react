import * as React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { ILocation } from 'history';
import { endLoading } from '../redux/modules/global';
import ProductList from './Product/ProductList';
import CartContainer from './Cart/Cart';

interface ShopPageProps {
  endLoading?: Function;
  location?: ILocation; // React router gives this to us
}

class Main extends React.Component<ShopPageProps, {}> {

  componentDidMount(): void {
    this.props.endLoading(this.props.location.pathname);
  }

  render() : React.ReactElement<ShopPageProps> {
    // Import styles
    require('../../../sass/common.scss');
    require('../../../sass/shopPage.scss');

    return (
      <div className="container p-b-3">
        <h2 className="text-xs-center p-y-3 small-caps"><strong>SHOP</strong></h2>
        <hr/>
        <ProductList />
        <hr/>
        <CartContainer />
      </div>
    )
  }
}

export default connect(
  null,
  Object.assign({},
    routeActions,
    { endLoading }
  ) as any
)(Main)
