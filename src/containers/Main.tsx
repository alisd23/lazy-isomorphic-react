import * as React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import ProductList from './ProductList';
import CartContainer from './Cart';

class Main extends React.Component<{}, {}> {

  render() : React.ReactElement<{}> {
    return (
      <div>
        <h2 className="text-xs-center m-y-3">Shopping Cart Example</h2>
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
