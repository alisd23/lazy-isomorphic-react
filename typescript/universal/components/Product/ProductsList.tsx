import * as React from 'react';

interface IProductsListProps {
  children?: React.ReactElement<any>[];
}

class ProductsList extends React.Component<IProductsListProps, {}> {
  render() : React.ReactElement<IProductsListProps>  {

    return (
      <div className="p-x-2 p-y-3">
        <h5 className="m-b-3 small-caps">Products</h5>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default ProductsList;
