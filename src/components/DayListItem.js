import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayName = props.name;
  const spotsRemaining = props.spots;
  return (
    <li oncClick={() => props.setDay(dayName)}>
      <h2 className="text--regular">{dayName}</h2> 
      <h3 className="text--light">{spotsRemaining} spots remaining</h3>
    </li>
  );
}