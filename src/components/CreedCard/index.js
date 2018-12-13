import React, { PureComponent } from 'react';
import icons from '../../icons';
import './style.css';
import { Power4 } from 'gsap/EasePack';
import TweenMax from 'gsap/TweenMax';
import TimelineMax from 'gsap/TimelineMax';

const noop = () => (null)

// just a little container/wrapper/hoc
export default ( { creed, onClick } ) => {
  return (
    <div style={{height: '40vh'}} onClick={ onClick || noop }>
      <CreedCard creed={ creed } />
    </div>
  )
}

class CreedCard extends PureComponent {
  constructor ( props ) {
    super( props );
    this.stick = null;
    this.circle = null;
    this.icon = null;
    this.message = null;
    this.isRunning = false;
  }

  componentDidMount () {
    this.runAnimation()
  }
  componentDidUpdate () {
    this.runAnimation()
  }
  runAnimation () {
    if ( this.isRunning ) {
      return;
    }
    this.isRunning = true;
    const staggers = this.message.querySelectorAll( 'span' );
    const tl = new TimelineMax( { onComplete: () => this.isRunning = false } );
    tl.add( TweenMax.from( this.stick, 0.3, { height: 0 } ) );
    tl.add( TweenMax.from( this.circle, 0.3, { rotationY: 90 } ) );
    tl.add([
      TweenMax.from( this.icon, 0.5, { opacity: 0, scale: 2 } ),
      TweenMax.from( this.message, 1, { scale: 0.9 } ),
      TweenMax.staggerFrom( staggers, 0.8, { opacity: 0, ease: Power4.easeOut }, 0.1 )
    ]);
  }
  render () {
    const { creed } = this.props;
    const colorStyle = {
      backgroundColor: creed.color
    }
    const fontSize = {
      fontSize: creed.text.split(' ').length < 10
        ? 'calc(8vmin)'
        : 'calc(6vmin)'
    }

    return (
      <div className="creed-card">
        <div className="creed-side">
          <div
            ref={ stick => this.stick = stick }
            className="vertical-stick"
            style={ colorStyle } />
          <div
            ref={ circle => this.circle = circle }
            className="circle"
            style={ colorStyle }>
            <img
              ref={ icon => this.icon = icon }
              alt={ creed.icon }
              src={ icons[ creed.icon ] } />
          </div>
        </div>
        <div ref={ msg => this.message = msg } className="creed-text" style={ fontSize }>
        {
          creed.text.split(' ').map( ( word, idx ) => {
            return creed.keywords.includes( word )
              ? <span key={ idx } className="keyword">{ word } </span>
              : <span key={ idx }>{ word } </span>
          })
        }
        </div>
      </div>
    )
  }
}