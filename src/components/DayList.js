import React from "react";
import DayListItem from "./DayListItem";

/*Daylist component for Application */
export default function DayList(props) {

  const listOfDays = props.days.map(day => 
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />);
      
  return (
    <ul>{listOfDays}</ul>
  )
};