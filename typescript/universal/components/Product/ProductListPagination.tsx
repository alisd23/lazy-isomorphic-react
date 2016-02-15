import * as React from 'react';
import * as classNames from 'classnames';

const MAX_LINKS = 10;

interface IProductsListPaginationProps {
  page: number;
  pages: number;
  onPageSelected: (page: number) => void;
}

class ProductsListPagination extends React.Component<IProductsListPaginationProps, {}> {
  render() : React.ReactElement<IProductsListPaginationProps>  {

    const linksBefore = this.props.page - 1;
    const linksAfter = this.props.pages - this.props.page;

    let linksStart = this.props.page;
    let linksEnd = this.props.page;

    while ((linksEnd - linksStart) < MAX_LINKS - 1) {
      if (linksEnd < this.props.pages) {
        linksEnd++;
      }
      if ((linksStart > 1) && ((linksEnd - linksStart) < MAX_LINKS - 1)) {
        linksStart--;
      }
      if (linksEnd === this.props.pages && linksStart === 1) {
        break;
      }
    }

    const links: JSX.Element[] = [];

    // BACK arrow
    if (this.props.page > 1) {
      links.push(
        <div className="pagination-link" key={'back'}
          onClick={() => this.props.onPageSelected(this.props.page - 1)}>
          <i className="material-icons">keyboard_arrow_left</i>
        </div>
      )
    }

    // All page numbers
    for (let i = linksStart; i <= linksEnd; i++) {
      const classes = classNames(
        "pagination-link",
        i === this.props.page ? 'active' : ''
      )
      links.push(
        <div className={classes} key={i} onClick={() => this.props.onPageSelected(i)} >
          <span>{i}</span>
        </div>
      )
    }

    // FORWARD arrow
    if (this.props.page < this.props.pages) {
      links.push(
        <div className="pagination-link" key={'forward'}
          onClick={() => this.props.onPageSelected(this.props.page + 1)}>
          <i className="material-icons">keyboard_arrow_right</i>
        </div>
      )
    }

    return (
      <div className="pagination p-y-3">
        { links }
      </div>
    );
  }
}

export default ProductsListPagination;
