import React from "react";
import PropTypes from "prop-types";

const DEFAULT_DURATION = 0.5;
const MILLISECOND = 1000;

export class MouseHoldListener extends React.Component {
  time = 0;
  timeout = 0;

  constructor() {
    super();
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointermove", this.handleMove);
  }

  componentWillUnmount() {
    document.removeEventListener("pointerup", this.onPointerUp);
    document.removeEventListener("pointermove", this.handleMove);
  }

  handleMove = e => {
    if (this.timeout && (e.movementX || e.movementY)) {
      clearInterval(this.timeout);
      this.timeout = 0;
    }
  };

  onPointerDown() {
    const { onHoldStart, duration } = this.props;
    this.time = new Date().getTime();
    this.timeout = setTimeout(onHoldStart, duration * MILLISECOND);
  }

  onPointerUp() {
    const { onHoldEnd, duration, onClick } = this.props;
    clearTimeout(this.timeout);
    if (this.timeout) {
      if (new Date().getTime() - this.time > duration * MILLISECOND) {
        this.timeout = 0;
        onHoldEnd();
      } else onClick();
    }
  }

  render() {
    return (
      <div className={this.props.className} onPointerDown={this.onPointerDown}>
        {this.props.children}
      </div>
    );
  }
}

export default MouseHoldListener;

MouseHoldListener.defaultProps = {
  duration: DEFAULT_DURATION
};

MouseHoldListener.propTypes = {
  onHoldStart: PropTypes.func.isRequired,
  onHoldEnd: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  duration: PropTypes.number
};
