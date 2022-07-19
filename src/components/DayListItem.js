import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

const formatSpots = function(spots) {
  if (spots === 1) {
    return "1 spot remaining";
  } else if (spots === 0) {
    return "no spots remaining";
  } else {
    return `${spots} spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayName = props.name;
  const spotsRemaining = props.spots;
  const selectedDay = props.selected;
  const setTheDay = props.setDay;

  const dayClass = classNames("day-list__item",{
    "day-list__item--selected": selectedDay,
    "day-list__item--full": spotsRemaining === 0
  });

  return (
    <li onClick={setTheDay} className={dayClass}>
      <h2 className="text--regular">{dayName}</h2> 
      <h3 className="text--light">{formatSpots(spotsRemaining)}</h3>
    </li>
  );
}