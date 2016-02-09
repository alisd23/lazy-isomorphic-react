import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';

interface IProductProps {
  key?: any;
  id: number;
  price: number;
  quantity?: number;
  image: string;
  title: string;
  description?: string;
  children?: React.ReactElement<any>[];
  quantityControls?: React.ReactElement<any>;
  removeButton?: React.ReactElement<any>;
  push?: (String) => any;
}

class Product extends React.Component<IProductProps, {}> {

  render() : React.ReactElement<IProductProps> {
    // Import styles
    return (
      <div className="flex">
        <div className="frame flex-static m-r-3">
          <img src={`/assets/images/${this.props.image}`} />
        </div>
        <div className="flex-expand">
          <h5 className="m-b-1">
            <a onClick={() => this.props.push(`/product/${this.props.id}`)}>
              <strong>{this.props.title}</strong>
            </a>
          </h5>
          <h4>
            <span>£{this.props.price}</span>
            <span className="small"> {this.props.quantity ? `x ${this.props.quantity}` : null}</span>
            {this.props.quantityControls}
          </h4>
          {
            this.props.description &&
              <p className="text-muted">
                {this.props.description}
              </p>
          }
        </div>

        {
          this.props.removeButton &&
            <div className="m-l-2 flex-static">
              {this.props.removeButton}
            </div>
        }
      </div>
    )
  }
}

export default connect(
  null,
  routeActions as any
)(Product)
