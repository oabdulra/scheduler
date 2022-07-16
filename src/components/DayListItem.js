import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const formatSpots = function(props) {
  if (props.spots === 1) {
    return "1 spot remaining";
  } else if (props.spots === 0) {
    return "no spots remaining";
  } else {
    return `${props.spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayName = props.name;
  const spotsRemaining = props.spots;
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": spotsRemaining === 0
  });

  return (
    <li oncClick={() => props.setDay(dayName)} className={dayClass}>
      <h2 className="text--regular">{dayName}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}