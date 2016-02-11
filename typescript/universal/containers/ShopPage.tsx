import * as React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { ILocation } from 'history';
import { endLoading } from '../redux/modules/global';
import ProductList from './Product/ProductList';
import CartContainer from './Cart/Cart';
import IAppState from '../interfaces/AppState';

interface ShopPageProps {
  endLoading?: Function;
  loading?: boolean;
  location?: ILocation; // React router gives this to us
}

class Main extends React.Component<ShopPageProps, {}> {

  componentWillMount(): void {
    this.stopLoading();
  }
  componentWillUpdate(nextProps: ShopPageProps): void {
    this.stopLoading(nextProps);
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

  private stopLoading(props = this.props) : void {
    if (props.loading)
      props.endLoading(props.location.pathname);
  }
}

function mapStateToProps(state: IAppState, ownProps) {
  return {
    loading: state.global.loading
  }
}

export default connect(
  mapStateToProps,
  Object.assign({},
    routeActions,
    { endLoading }
  ) as any
)(Main)
