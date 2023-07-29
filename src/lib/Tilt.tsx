/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-global-assign */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useRef, useState } from "react";

const Tilt = (props) => {
  const [style, setStyle] = useState({});
  const elementRef = useRef(null);

  const defaultSettings = {
    reverse: false,
    max: 35,
    perspective: 1000,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    scale: "1.1",
    speed: "1000",
    transition: true,
    axis: null,
    reset: true,
  };

  const settings = { ...defaultSettings, ...props.options };
  const reverse = settings.reverse ? -1 : 1;

  const onMouseEnter = (cb = () => {}, e) => {
    updateElementPosition();

    setStyle({
      ...style,
      willChange: "transform",
    });

    setTransition();

    return cb(e);
  };

  const reset = () => {
    window.requestAnimationFrame(() => {
      setStyle({
        ...style,
        transform:
          "perspective(" +
          settings.perspective +
          "px) " +
          "rotateX(0deg) " +
          "rotateY(0deg) " +
          "scale3d(1, 1, 1)",
      });
    });
  };

  const onMouseMove = (cb = () => {}, e) => {
    e.persist();

    if (updateCall !== null) {
      window.cancelAnimationFrame(updateCall);
    }

    // eslint-disable-next-line no-global-assign
    event = e;
    updateCall = requestAnimationFrame(update.bind(this, e));

    return cb(e);
  };

  const setTransition = () => {
    clearTimeout(transitionTimeout);

    setStyle({
      ...style,
      transition: settings.speed + "ms " + settings.easing,
    });

    transitionTimeout = setTimeout(() => {
      setStyle({
        ...style,
        transition: "",
      });
    }, settings.speed);
  };

  const onMouseLeave = (cb = () => {}, e) => {
    setTransition();

    if (settings.reset) {
      reset();
    }
    return cb(e);
  };

  const getValues = (e) => {
    const x = (e.nativeEvent.clientX - left) / width;
    const y = (e.nativeEvent.clientY - top) / height;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);

    const tiltX = (reverse * (settings.max / 2 - _x * settings.max)).toFixed(2);
    const tiltY = (reverse * (_y * settings.max - settings.max / 2)).toFixed(2);

    const percentageX = _x * 100;
    const percentageY = _y * 100;

    return {
      tiltX,
      tiltY,
      percentageX,
      percentageY,
    };
  };

  const updateElementPosition = () => {
    const rect = elementRef.current.getBoundingClientRect();
    const width = elementRef.current.offsetWidth;
    const height = elementRef.current.offsetHeight;
    const left = rect.left;
    const top = rect.top;
  };

  const update = (e) => {
    const values = getValues(e);

    setStyle({
      ...style,
      transform:
        "perspective(" +
        settings.perspective +
        "px) " +
        "rotateX(" +
        (settings.axis === "x" ? 0 : values.tiltY) +
        "deg) " +
        "rotateY(" +
        (settings.axis === "y" ? 0 : values.tiltX) +
        "deg) " +
        "scale3d(" +
        settings.scale +
        ", " +
        settings.scale +
        ", " +
        settings.scale +
        ")",
    });

    updateCall = null;
  };

  const styleWithProps = { ...props.style, ...style };

  return (
    <div
      style={styleWithProps}
      className={props.className}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      ref={elementRef}
    >
      {props.children}
    </div>
  );
};

export default Tilt;
