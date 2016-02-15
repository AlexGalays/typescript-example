import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* Also depends on gsap implicitly. See the enter/exit props */

/*
 * An alternative to ReactTransitionGroup for simple swap transitions (ONE item is replaced by another)
 * The entering element is not added to the DOM till the exiting element completely finished its animation.
 * This has a few benefits:
 *  - There is no need to change the entering node's display to 'none' since it's not in the DOM yet
 *  - This is less work and thus is less confusing for browsers (fixes a rendering bug with Chrome 46)
 *
 * Note: Giving a key to the SwapTransition child is mandatory.
 */

interface Props {
  children?: any;

  enter(el: Element): any;
  exit(el: Element): any;

  onEnter?: (el: Element, key: string) => void;
  onExit?: (el: Element, key: string) => void;
}

interface State {
  entering?: { component: any, animation?: any, animate: boolean },
  exiting?: { component: any, animation?: any, animate: boolean }
}

export default class SwapTransition extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    let { entering, exiting } = this.state;
    let currentAnimation = exiting || entering;
    if (currentAnimation) stopAnimation(currentAnimation);
  }

  componentWillReceiveProps(nextProps) {
    let element = this.props.children;
    let newElement = nextProps.children;

    let elementKey = element ? element.key : undefined;
    let newElementKey = newElement ? newElement.key : undefined;

    // Nothing changed: No transition required
    if (elementKey == newElementKey) return;

    let { entering, exiting } = this.state;
    let currentAnimation = exiting || entering;

    // We were already in the middle of a transition:
    // Stop everything and only animate the new element
    if (currentAnimation) {
      stopAnimation(currentAnimation);

      entering = {
        component: newElement,
        animate: !!newElement
      };

      this.setState({ entering, exiting: null });
    }
    // Regular transition from a stable component to the next one
    else {
      // Only animate if it wasn't null
      exiting = element ? { component: element, animate: true } : null;

      entering = {
        component: newElement,
        // If the exiting element is null (and we are not,
        // which is taken care of with the key comparison) enter immediately
        animate: !element
      };

      this.setState({ entering, exiting });
    }
  }

  // This is where the animations are really started as we need to get references to the DOM nodes
  componentDidUpdate() {
    let { entering, exiting } = this.state;
    let { enter, exit, onEnter, onExit } = this.props;

    if (entering && entering.animate) {
      let node = ReactDOM.findDOMNode(this.refs[entering.component.key]);
      entering.animate = false;
      entering.animation = enter(node).eventCallback('onComplete', this.onEnterComplete);
      if (onEnter) onEnter(node, entering.component.key);
    }
    else if (exiting && exiting.animate) {
      let node = ReactDOM.findDOMNode(this.refs[exiting.component.key]);
      exiting.animate = false;
      exiting.animation = exit(node).eventCallback('onComplete', this.onExitComplete);
      if (onExit) onExit(node, exiting.component.key);
    }
  }

  render() {
    let element = this.currentElement() || null;

    // Clone the passed element simply to give it a ref for later manipulation
    return element && React.cloneElement(element, { key: element.key, ref: element.key });
  }

  onEnterComplete = () => {
    this.state.entering.animation = null;
    this.setState({ entering: null });
  }

  onExitComplete = () => {
    let { entering, exiting } = this.state;

    exiting.animation = null;

    // The exit transition is finished:
    // Transition the entering component if there is anything to transition to
    entering.animate = !!entering.component;

    this.setState({ exiting: null });
  }

  currentElement() {
    let { entering, exiting } = this.state;

    if (exiting) return exiting.component;
    if (entering) return entering.component;
    return this.props.children && React.Children.only(this.props.children);
  }

};

function stopAnimation(target) {
  if (!target.animation) return;

  target.animation.eventCallback('onComplete', null).kill();
  target.animation = null;
}
