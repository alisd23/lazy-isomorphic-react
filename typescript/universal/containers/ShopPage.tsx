import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import ProductList from './Product/ProductList';
import CartContainer from './Cart/Cart';

class Main extends React.Component<{}, {}> {

  render() : React.ReactElement<{}> {
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
  routeActions as any
)(Main)
