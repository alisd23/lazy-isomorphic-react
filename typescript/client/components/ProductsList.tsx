import * as React from 'react';
import getClass from '../../helpers/classesHelper';

interface IProductsListProps {
  title: string;
  children?: React.ReactElement<any>[];
}

class ProductsList extends React.Component<IProductsListProps, {}> {
  render() : React.ReactElement<IProductsListProps>  {
    const styles = require('../../../sass/common.scss');

    return (
      <div className={getClass("p-a-2", styles)}>
        <h3 className={getClass("m-b-2", styles)}>{this.props.title}</h3>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ProductsList;
