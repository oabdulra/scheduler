import React from "react";
import "./Button.scss";
import classNames from "classnames";

/*Button component for Application */
export default function Button(props) {
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
 
   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
};

 
