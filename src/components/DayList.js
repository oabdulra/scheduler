import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const listOfDays = props.days.map(day => 
    
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={() => props.onChange(day.name)}
      />);

  return (
    <ul>{listOfDays}</ul>
  )
};