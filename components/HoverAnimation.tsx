import React, {useState} from "react";
import classNames from "classnames";

export const HoverAnimation = (props : {children : React.ReactNode}) => {

  const [animated, setAnimated] = useState(false);

  const onEnter = () => {
    setAnimated(true);
  }

  React.useEffect(() => {
    if (!animated) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setAnimated(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animated]);

  return (
      <div onMouseEnter={onEnter} className={classNames(animated && "animate__animated animate__rubberBand")}>
        {props.children}
      </div>
  )

}
