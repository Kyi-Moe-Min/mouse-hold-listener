import React from "react";
import PropTypes from "prop-types";

const DEFAULT_DURATION = 0.5;
const MILLISECOND = 1000;

class MouseHoldListener extends React.Component {
  time = 0;
  timeout = 0;

  constructor() {
    super();
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("pointerup", this.onPointerUp);
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.onPointerUp);
  }

  onPointerDown() {
    const { onHoldStart, duration } = this.props;
    this.time = new Date().getTime();
    this.timeout = setTimeout(onHoldStart, duration * MILLISECOND);
  }

  onPointerUp() {
    const { onHoldStop, duration } = this.props;
    clearTimeout(this.timeout);
    if (
      this.timeout &&
      new Date().getTime() - this.time > duration * MILLISECOND
    )
      onHoldStop();
  }

  render() {
    return (
      <div {...this.props} onPointerDown={this.onPointerDown}>
        {this.props.children}
      </div>
    );
  }
}

MouseHoldListener.defaultProps = {
  duration: DEFAULT_DURATION
};

MouseHoldListener.propTypes = {
  onHoldStart: PropTypes.func.isRequired,
  onHoldStop: PropTypes.func.isRequired,
  duration: PropTypes.number
};

export default MouseHoldListener;
