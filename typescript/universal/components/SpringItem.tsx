import * as React from 'react';

const rebound: any = require('rebound');

interface ISpringConfig {
  tension?: number;
  friction?: number;
}
interface ISpringItemProps {
  key: any;
  springConfig?: ISpringConfig;
  children?: JSX.Element[];
}

export default class SpringItem extends React.Component<ISpringItemProps, {}> {
  defaultSpringConfig: ISpringConfig = {
    tension: 8,
    friction: 12
  }
  springs: any;

  // APPEARING (only transition out)
  componentWillAppear(callback) {
    this.createSprings(true);
    callback(); // Calls the componentDidAppear function below
  }
  componentDidAppear() {
    this.springs.height.setEndValue(1);
    this.springs.opacity.setEndValue(1);
  }

  // ENTERING (transition in and out)
  componentWillEnter(callback) {
    this.getElement('wrapper').style.height = '0';
    this.getElement('wrapper').style.opacity = '0';
    this.createSprings();
    callback(); // Calls the componentDidEnter function below
  }
  componentDidEnter() {
    this.springs.height.setEndValue(1);
    this.springs.opacity.setEndValue(1);
  }
  componentWillUnmount() {
    this.springs.height.destroy();
    this.springs.opacity.destroy();
  }

  componentWillLeave(remove: Function) {
    this.setListeners(this.springs);

    this.springs.height.addListener({
      onSpringAtRest: (spring) => {
        this.getElement('wrapper').style.height = '0';
        this.springs.height.removeAllListeners();
      }
    });
    this.springs.opacity.addListener({
      onSpringAtRest: (spring) => {
        remove();
      }
    });
    this.springs.height.setEndValue(0);
    this.springs.opacity.setEndValue(0);
  }

  render() : React.ReactElement<ISpringItemProps> {

    return (
      <div style={{overflow: 'hidden'}} className="spring-item" ref="wrapper">
        <div className="spring-item-container" ref="item">
          {this.props.children}
        </div>
      </div>
    )
  }

  private createSprings(animateOutOnly?: boolean) {
    const springSystem = new rebound.SpringSystem();
    const heightConfig: ISpringConfig = Object.assign({},
      this.defaultSpringConfig,
      this.props.springConfig || {}
    );
    const opacityConfig: ISpringConfig = {
      tension: heightConfig.tension,
      friction: heightConfig.friction * 2
    };

    const heightSpring = springSystem.createSpring(heightConfig.tension, heightConfig.friction);
    const opacitySpring = springSystem.createSpring(opacityConfig.tension, opacityConfig.friction);

    this.springs = {
      height: heightSpring,
      opacity: opacitySpring
    }

    this.setListeners(this.springs, animateOutOnly);

    return this.springs;
  }
  private setListeners(springs, animateOutOnly?) {
    this.springs.height.removeAllListeners();
    this.springs.opacity.removeAllListeners();

    springs.height.addListener({
      onSpringUpdate: (spring) => {
        const toHeight = this.getElement('item').offsetHeight;
        const fromHeight = animateOutOnly ? toHeight : 0;
        let val = spring.getCurrentValue();
        const height = rebound.MathUtil.mapValueInRange(val, 0, 1, fromHeight, toHeight);
        this.getElement('wrapper').style.height = height + 'px';
      },
      onSpringAtRest: (spring) => {
        // Required inc ase screen size is changed
        this.getElement('wrapper').style.height = 'auto';
      }
    });
    springs.opacity.addListener({
      onSpringUpdate: (spring) => {
        let val = spring.getCurrentValue();
        const fromOpacity = animateOutOnly ? 1 : 0;
        const opacity = rebound.MathUtil.mapValueInRange(val, 0, 1, fromOpacity, 1);
        this.getElement('wrapper').style.opacity = opacity;
      }
    });
  }
  private getElement(ref: string): HTMLElement {
    return this.refs[ref] as HTMLElement;
  }
}
