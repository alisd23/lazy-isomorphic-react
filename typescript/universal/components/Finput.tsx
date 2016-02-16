import * as React from 'react';
import * as finput from 'finput';

interface IFinputProps {
  className?: string;
  scale?: number;
  range?: number;
  fixed?: boolean;
  thousands?: string;
  decimal?: string;
  shortcuts?: any;
}


export default class Finput extends React.Component<IFinputProps, {}> {
  destroy: Function;

  componentDidMount() {
    const options = Object.assign({}, this.props);
    delete options.className;
    this.destroy = finput(this.refs['input'] as Element, options);
  }
  componentWillUnmount() {
    this.destroy && this.destroy();
  }

  render() : React.ReactElement<IFinputProps> {
    return (
      <input className={this.props.className} ref="input" />
    )
  }

  getRawValue() : number {
    return (this.refs['input'] as any).rawValue;
  }
}
